import { format } from 'date-fns';
import type { Client } from 'discord.js';
// import { Message, TextChannel } from 'discord.js';
import { table } from 'table';
import { rosterRef } from '@modules/unity/rosterUpdate';
import { sortByNameWithRankOrder, mapRosterData, tableConfig } from './utils';

const size = 10;
const charParams = ['Personaje', 'ilvl', 'M+ Total', 'Highest'];
const params = ['#', 'Nombre', ...charParams, ...charParams];

let messages: any[];
let timeMessage: any | undefined;

const setRosterChannelUpdater = async (client: Client, channelID: string) => {
  client.on('ready', () => {
    const channel = client.channels.cache.get(channelID) as any;

    rosterRef.onSnapshot(async (doc) => {
      const rosterData = await doc.data();

      const core1Data = rosterData?.core1.sort(sortByNameWithRankOrder).map(mapRosterData);
      const updateTime = `Actualizado a las ${format(new Date(), 'hh:mm')}`;

      if (timeMessage?.edit) {
        timeMessage.edit(updateTime);
      } else {
        timeMessage = await channel.send(updateTime);
      }

      const arrayRange = Math.floor((core1Data.length - 1) / size);

      for (let i = 0; i <= arrayRange; i++) {
        const characters = core1Data.slice(i * size, (i + 1) * size);
        const data = [params, ...characters];

        const output = table(data, tableConfig);

        if (messages && messages?.[i]?.edit) {
          await messages[i].edit(`\`\`\`${output}\`\`\``, { code: true });
        } else {
          const msg = await channel.send(`\`\`\`${output}\`\`\``);

          messages = [...(messages || []), msg];
        }
      }
    });
  });
};

export default setRosterChannelUpdater;
