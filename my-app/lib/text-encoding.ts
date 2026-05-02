export type EncodedTree =
  | string
  | EncodedTree[]
  | { [key: string]: EncodedTree };

const LATIN_MOJIBAKE_RE = /[\u00c2\u00c3\u00d0\u00d1][\u0080-\u00ff]?/gu;
const CP1251_MOJIBAKE_RE = /[\u0420\u0421][\u0080-\u04ff]/gu;
const SMART_PUNCT_MOJIBAKE_RE = /\u0432[\u0080-\u20ff]/gu;

const CP1251_CODEPOINTS = [
  0x0402, 0x0403, 0x201a, 0x0453, 0x201e, 0x2026, 0x2020, 0x2021,
  0x20ac, 0x2030, 0x0409, 0x2039, 0x040a, 0x040c, 0x040b, 0x040f,
  0x0452, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
  0xfffd, 0x2122, 0x0459, 0x203a, 0x045a, 0x045c, 0x045b, 0x045f,
  0x00a0, 0x040e, 0x045e, 0x0408, 0x00a4, 0x0490, 0x00a6, 0x00a7,
  0x0401, 0x00a9, 0x0404, 0x00ab, 0x00ac, 0x00ad, 0x00ae, 0x0407,
  0x00b0, 0x00b1, 0x0406, 0x0456, 0x0491, 0x00b5, 0x00b6, 0x00b7,
  0x0451, 0x2116, 0x0454, 0x00bb, 0x0458, 0x0405, 0x0455, 0x0457,
  0x0410, 0x0411, 0x0412, 0x0413, 0x0414, 0x0415, 0x0416, 0x0417,
  0x0418, 0x0419, 0x041a, 0x041b, 0x041c, 0x041d, 0x041e, 0x041f,
  0x0420, 0x0421, 0x0422, 0x0423, 0x0424, 0x0425, 0x0426, 0x0427,
  0x0428, 0x0429, 0x042a, 0x042b, 0x042c, 0x042d, 0x042e, 0x042f,
  0x0430, 0x0431, 0x0432, 0x0433, 0x0434, 0x0435, 0x0436, 0x0437,
  0x0438, 0x0439, 0x043a, 0x043b, 0x043c, 0x043d, 0x043e, 0x043f,
  0x0440, 0x0441, 0x0442, 0x0443, 0x0444, 0x0445, 0x0446, 0x0447,
  0x0448, 0x0449, 0x044a, 0x044b, 0x044c, 0x044d, 0x044e, 0x044f,
] as const;

const CP1251_ENCODE_MAP = new Map<string, number>(
  CP1251_CODEPOINTS.map((codePoint, index) => [
    String.fromCodePoint(codePoint),
    index + 0x80,
  ])
);

function countMojibakeMarkers(value: string) {
  return (
    (value.match(LATIN_MOJIBAKE_RE) ?? []).length +
    (value.match(CP1251_MOJIBAKE_RE) ?? []).length +
    (value.match(SMART_PUNCT_MOJIBAKE_RE) ?? []).length
  );
}

function scoreReadableText(value: string) {
  const cyrillic = (value.match(/[А-Яа-яЁё]/g) ?? []).length;
  const latin = (value.match(/[A-Za-z]/g) ?? []).length;
  const digits = (value.match(/\d/g) ?? []).length;
  const spaces = (value.match(/\s/g) ?? []).length;
  const noisyPunctuation = (value.match(/[#$@<>^~`|\\]/g) ?? []).length;
  const replacementChars = (value.match(/\?/g) ?? []).length;

  return cyrillic * 3 + latin + digits + spaces - noisyPunctuation * 4 - replacementChars * 3;
}

function decodeLatin1Utf8(value: string) {
  return Buffer.from(value, "latin1").toString("utf8");
}

function encodeCp1251(value: string) {
  const bytes: number[] = [];

  for (const character of value) {
    const codePoint = character.codePointAt(0);
    if (codePoint === undefined) {
      return null;
    }

    if (codePoint <= 0x7f) {
      bytes.push(codePoint);
      continue;
    }

    const mapped = CP1251_ENCODE_MAP.get(character);
    if (mapped === undefined) {
      return null;
    }

    bytes.push(mapped);
  }

  return Buffer.from(bytes);
}

function decodeCp1251Utf8(value: string) {
  const encoded = encodeCp1251(value);
  if (!encoded) {
    return null;
  }

  return encoded.toString("utf8");
}

export function repairMojibakeText(value: string) {
  let current = value;

  for (let pass = 0; pass < 2; pass += 1) {
    const currentMarkers = countMojibakeMarkers(current);
    if (currentMarkers === 0) {
      break;
    }

    const decodedCandidates = [
      decodeCp1251Utf8(current),
      decodeLatin1Utf8(current),
    ].filter((item): item is string => item !== null && !item.includes("\ufffd"));

    if (decodedCandidates.length === 0) {
      break;
    }

    const decoded = decodedCandidates.reduce((best, candidate) => {
      const candidateMarkers = countMojibakeMarkers(candidate);
      const bestMarkers = countMojibakeMarkers(best);

      if (candidateMarkers !== bestMarkers) {
        return candidateMarkers < bestMarkers ? candidate : best;
      }

      return scoreReadableText(candidate) > scoreReadableText(best)
        ? candidate
        : best;
    });

    const decodedMarkers = countMojibakeMarkers(decoded);
    if (decodedMarkers >= currentMarkers) {
      break;
    }

    current = decoded;
  }

  return current;
}

export function repairEncodedTree<T>(value: T): T {
  if (typeof value === "string") {
    return repairMojibakeText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => repairEncodedTree(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
        key,
        repairEncodedTree(nested),
      ])
    ) as T;
  }

  return value;
}
