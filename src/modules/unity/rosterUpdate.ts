import pLimit from 'p-limit';
import getAccessToken from '@modules/battleNet/getAccessToken';
import { rosterRef } from '@modules/firebase';
import getCharacterData from './characterUpdate';
import { Person } from './types';

const limit = pLimit(5);

export const updatePerson = async (person: Person) => {
  const characters = await Promise.all(person.characters.map((char) => getCharacterData(char)));

  return { ...person, characters };
};

export const updateRoster = async (roster: Person[]) => {
  const core = await Promise.all(roster.map((person) => limit(async () => updatePerson(person))));

  return core;
};

export const updateCore = async () => {
  await getAccessToken();
  const rosterDocuments = await rosterRef.get();
  const rosterData = rosterDocuments.data();

  const core1 = await updateRoster(rosterData?.core1 as Person[]);
  console.log(core1);

  const updatedRosterData = {
    ...rosterData,
    core1,
  };

  return rosterRef.update(updatedRosterData);
};
