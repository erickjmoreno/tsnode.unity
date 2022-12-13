import pLimit from 'p-limit';
import getAccessToken from '@modules/battleNet/getAccessToken';
import { firestore } from '@modules/firebase';
import { guildName } from '@configs/env';
import createNewJob from '@modules/cron';
import getCharacterData from './characterUpdate';
import type { Person } from './types';

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

const updateCoreInfo = async () => {
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

export const updateCore = async () => {
  // updateCoreInfo();
  createNewJob(updateCoreInfo);
};
