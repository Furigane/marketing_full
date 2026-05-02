import "server-only";

import { normalizeSiteLocale } from "@/lib/site-locales";
import {
  deepMergeTranslationValue,
  getTranslationOverrideStoreSync,
} from "@/lib/site-translation-runtime";
import type { LocalizedTeamMember, TeamMember } from "@/lib/team-members";
import { getTeamMemberBaseContent } from "@/lib/team-members";
import { repairEncodedTree } from "@/lib/text-encoding";

export function getLocalizedTeamMember(
  member: TeamMember,
  locale: string
): LocalizedTeamMember {
  const normalizedLocale = normalizeSiteLocale(locale);
  const overrides = getTranslationOverrideStoreSync();
  const baseContent = getTeamMemberBaseContent(member, locale);

  if (!baseContent) {
    return member as LocalizedTeamMember;
  }

  return {
    ...member,
    ...repairEncodedTree(
      deepMergeTranslationValue(
        baseContent,
        overrides.teamMembers[member.id]?.[normalizedLocale]
      )
    ),
  } as LocalizedTeamMember;
}
