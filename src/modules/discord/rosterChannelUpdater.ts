import { format } from 'date-fns';
import { Message, Client, TextChannel } from 'discord.js';
import { rosterRef } from '@modules/unity/rosterUpdate';
import { sortByNameWithRankOrder, mapRosterData, tableConfig } from './utils';
import { table } from 'table';

const size = 10;
const charParams = ['Personaje', 'ilvl', 'Repu', 'M+ Total', 'Highest', 'Leggo'];
const params = ['#', 'Nombre', ...charParams, ...charParams];

let messages: any[];
let timeMessage: any | undefined;

const setRosterChannelUpdater = async (client: Client, channelID: string) => {
  rosterRef.onSnapshot(async (doc) => {
    const rosterData = await doc.data();

    const core1Data = rosterData?.core1.sort(sortByNameWithRankOrder).map(mapRosterData);
    const updateTime = `Actualizado a las ${format(new Date(), 'hh:mm')}`;

    if (timeMessage?.edit) {
      timeMessage.edit(updateTime);
    } else {
      timeMessage = await (client.channels.cache.get(channelID) as any)?.send(updateTime);
    }

    const arrayRange = Math.floor((core1Data.length - 1) / size);

    for (let i = 0; i <= arrayRange; i++) {
      const characters = core1Data.slice(i * size, (i + 1) * size);
      const data = [params, ...characters];

      const output = table(data, tableConfig);

      if (messages[i]?.edit) {
        await messages[i].edit(output, { code: true });
      } else {
        const msg = await (client.channels.cache.get(channelID) as any)?.send(output, {
          code: true,
        });

        messages = [...messages, msg];
      }
    }
  });
};

export default setRosterChannelUpdater;