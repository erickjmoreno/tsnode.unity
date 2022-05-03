export interface Character {
  avatar: string;
  class: number;
  covenant: string;
  error: boolean;
  ilevel: number;
  lastModified: number | string;
  lastUpdate: number | string;
  legendary: number;
  legendarySlot: string;
  level: number;
  mscore: number;
  mythicRuns: number;
  mythicweekly: string;
  mythicweeklylvl: number;
  name: string;
  realm: string;
  renown: number;
  reputation: string;
  url: string;
}

export interface Person {
  avatar: string;
  country: string;
  name: string;
  rank: string;
  rankOrder: number;
  twitch: string;
  youtube: string;
  characters: Character[];
  classList: number[];
}
