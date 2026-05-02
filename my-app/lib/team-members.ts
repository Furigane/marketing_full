export const DEFAULT_TEAM_MEMBER_ID = "anastasia" as const;

export const TEAM_MEMBERS = [
  {
    id: "anastasia",
    image: "/img/workers/beautifull-caucasian-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "designer",
  },
  {
    id: "alexey",
    image: "/img/workers/man-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "targeting",
  },
  {
    id: "maria",
    image: "/img/workers/beautifuan-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "smm",
  },
  {
    id: "arina",
    image: "/img/workers/dawda.jpg",
    roleType: "seo",
  },
  {
    id: "vyacheslav",
    image: "/img/workers/beautifull-caucasiany-hair-smiles-isolated 1.jpg",
    roleType: "targeting",
  },
  {
    id: "ivan",
    image: "/img/workers/man-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "manager",
  },
  {
    id: "elizaveta",
    image: "/img/workers/beautifuan-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "content",
  },
] as const;

export type TeamRoleType = (typeof TEAM_MEMBERS)[number]["roleType"];
export type TeamMemberId = (typeof TEAM_MEMBERS)[number]["id"];

export function getTeamMember(id: string) {
  return TEAM_MEMBERS.find((member) => member.id === id);
}
