import { Character, Person } from '@modules/unity/types';
import { getBorderCharacters } from 'table';

export const sortByNameWithRankOrder = (a: Person, b: Person) => {
  const aRankOrder = a.rankOrder || 0;
  const bRankOrder = b.rankOrder || 0;

  if (aRankOrder < bRankOrder) return 1;
  if (aRankOrder > bRankOrder) return -1;
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;

  return 0;
};

const placeHolder = ['Placeholder', '-', '-', '-'];

export const getCharacterData = (data: Character): (string | number)[] => {
  if (!data) return placeHolder;
  const {
    ilevel = '',
    mythicRuns = '',
    mythicweeklylvl = '',
    name,
    error = false,
    // legendary = '',
    // reputation = '',
  } = data;
  const nameWithHandler = error ? `*${name}` : name;
  const payload = [nameWithHandler, ilevel, mythicRuns, mythicweeklylvl];

  return payload;
};

export const mapRosterData = ({ name, characters = [] }: Person, index: number) => {
  let characterData: (string | number)[] = [];

  for (let i = 0; i < 2; i++) {
    characterData = [...characterData, ...getCharacterData(characters[i])];
  }

  return [index + 1, name, ...characterData];
};

export const tableConfig = {
  border: getBorderCharacters('void'),
  columnDefault: {
    width: 12,
  },
  singleLine: true,
  columns: {
    0: {
      width: 3,
    },
    1: {
      width: 10,
    },
    3: {
      width: 8,
    },
    7: {
      width: 8,
    },
    4: {
      width: 8,
    },
    8: {
      width: 8,
    },
    5: {
      width: 8,
    },
    9: {
      width: 8,
    },
  },
};
