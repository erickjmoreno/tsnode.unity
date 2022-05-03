import getAccessToken from '@modules/battleNet/getAccessToken';
import axios from 'axios';

type mPlusData = { keystone_level: number | string };
export function sortMythicPlusByHigher(a: mPlusData, b: mPlusData) {
  if (a.keystone_level > b.keystone_level) return -1;
  if (a.keystone_level < b.keystone_level) return 1;

  return 0;
}

interface Reputation {
  faction: {
    id: number;
  };
  standing: {
    name: string;
    value: number;
  };
}

interface Achievement {
  reputations: Reputation[];
}

export function findAchievement({ reputations = [] }: Achievement): string {
  const archivistData = reputations.find(
    ({ faction }: { faction: { id: number } }) => faction.id === 2478,
  );

  const tier = archivistData?.standing?.name?.[0] || 'U';
  const value = archivistData?.standing?.value || 0;

  return `${tier} ${value}`;
}

export async function getIconFromUrl(url: string) {
  const accessToken = await getAccessToken();
  const accessTokenString = `&access_token=${accessToken}`;

  const { data: characterIconData } = await axios.get(url + accessTokenString);

  if (characterIconData && characterIconData.hasOwnProperty('assets')) {
    const { value = '' } =
      characterIconData?.assets?.find((data: { key: string }) => data.key === 'avatar') || {};

    return value;
  }

  return characterIconData?.avatar_url || '';
}
