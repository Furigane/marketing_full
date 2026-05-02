import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// @ts-expect-error Node --experimental-strip-types resolves .ts imports at runtime.
import { repairMojibakeText } from "../lib/text-encoding.ts";

const STORE_PATH = path.join(process.cwd(), "data", "site-translations.json");

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function repairTree(value: JsonValue): [JsonValue, number] {
  if (typeof value === "string") {
    const repaired = repairMojibakeText(value);
    return [repaired, repaired === value ? 0 : 1];
  }

  if (Array.isArray(value)) {
    let changes = 0;
    const nextValue = value.map((item) => {
      const [repairedItem, itemChanges] = repairTree(item);
      changes += itemChanges;
      return repairedItem;
    });
    return [nextValue, changes];
  }

  if (value && typeof value === "object") {
    let changes = 0;
    const nextEntries = Object.entries(value).map(([key, nested]) => {
      const [repairedNested, nestedChanges] = repairTree(nested);
      changes += nestedChanges;
      return [key, repairedNested] as const;
    });

    return [Object.fromEntries(nextEntries), changes];
  }

  return [value, 0];
}

async function main() {
  const raw = await readFile(STORE_PATH, "utf8");
  const parsed = JSON.parse(raw) as JsonValue;
  const [repaired, changes] = repairTree(parsed);

  if (changes === 0) {
    console.log("site-translations.json is already clean.");
    return;
  }

  await writeFile(STORE_PATH, JSON.stringify(repaired, null, 2), "utf8");
  console.log(`Repaired ${changes} translation value(s) in site-translations.json.`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
