import { Client } from 'discord.js';
import { channelId, token } from '@configs/env';
import setRosterChannelUpdater from './rosterChannelUpdater';

const setupDiscord = () => {
  const client = new Client({ intents: 1 });
  client.login(token);

  setRosterChannelUpdater(client, channelId);
};

export default setupDiscord;
