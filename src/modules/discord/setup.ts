import { Client } from 'discord.js';
import { channelId } from '@configs/env';
import setRosterChannelUpdater from './rosterChannelUpdater';

const setupDiscord = () => {
  const client = new Client({ intents: 1 });

  setRosterChannelUpdater(client, channelId);
};

export default setupDiscord;
