import pLimit from 'p-limit';
import getAccessToken from '@modules/battleNet/getAccessToken';
import { firestore } from '@modules/firebase';
import getCharacterData from './characterUpdate';
import { Person } from './types';
import { guildName } from '@configs/env';

const limit = pLimit(5);
export const rosterRef = firestore.collection(guildName).doc('roster');

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

  const updatedRosterData = {
    ...rosterData,
    core1,
  };

  return rosterRef.update(updatedRosterData);
};
