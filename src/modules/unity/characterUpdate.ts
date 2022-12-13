import blizzApi from '@modules/battleNet/api';
import { apiUrl } from '@constants/.';
import type { Character } from './types';
import {
  //  findAchievement,
  sortMythicPlusByHigher,
  getIconFromUrl,
} from './utils';

const getCharacterData = async (data: Character): Promise<Character> => {
  try {
    const { realm, name, url = '' } = data;
    const payload = { params: { realm, name } };

    const [
      { data: character },
      // { data: items },
      { data: mPlus },
      //  { data: achievements }
    ] = await Promise.all([
      blizzApi.get(apiUrl.character, payload),
      // blizzApi.get(apiUrl.equipment, payload),
      blizzApi.get(apiUrl.mythicPlus, payload),
      // blizzApi.get(apiUrl.reputation, payload),
    ]);

    const avatar = await getIconFromUrl(character.media.href);
    // const reputation = findAchievement(achievements);
    const highestRun = mPlus?.current_period?.best_runs?.sort(sortMythicPlusByHigher)?.[0];

    const feed = {
      ...data,
      url,
      avatar,
      // reputation,
      lastUpdate: Date.now(),
      lastModified: character.last_login_timestamp,
      level: character.level,
      ilevel: character.equipped_item_level,
      mscore: mPlus?.current_mythic_rating?.rating || 0,
      mythicweekly: highestRun?.dungeon?.name || '',
      mythicweeklylvl: highestRun?.keystone_level || '',
      mythicRuns: mPlus?.current_period?.best_runs?.length || '',
      error: false,
      // items: items.equipped_items.reduce((acc: any, item: any) => {
      //   return { ...acc, [item.slot.name]: item.level.value };
      // }, {}),
    };

    return feed;
  } catch (error) {
    console.log(error, { name: data?.name });

    return { ...data, error: true };
  }
};

export default getCharacterData;
