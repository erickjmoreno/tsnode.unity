import GooglePKG from 'google-spreadsheet';
import pLimit from 'p-limit';
import { accountEmail, accountPrivateKey, spreadsheetID } from '@configs/env';
import { rosterRef } from '@modules/unity/rosterUpdate';

const { GoogleSpreadsheet } = GooglePKG;
const doc = new GoogleSpreadsheet(spreadsheetID);

await doc.useServiceAccountAuth({
  client_email: accountEmail || '',
  private_key: accountPrivateKey || '',
});

await doc.loadInfo();

const reducer = (
  all: any,
  {
    name = '',
    class: classId = '',
    ilevel = '',
    mscore = '',
    mythicweeklylvl = '',
    mythicweekly = '',
  },
  i: number,
) => {
  all[`name${i}`] = name;
  all[`class${i}`] = classId;
  all[`ilevel${i}`] = ilevel;
  all[`mscore${i}`] = mscore;
  all[`mplus${i}`] = `${mythicweekly} ${mythicweeklylvl}`;

  return all;
};

function sortByNameWithRoleOrder(a: any, b: any) {
  const aRoleOrder = +a.roleOrder || 0;
  const bRoleOrder = +b.roleOrder || 0;
  const aClass = a.characters?.[0]?.class || 12;
  const bClass = b.characters?.[0]?.class || 12;
  const aName = a.name || 'z';
  const bName = b.name || 'z';

  if (bRoleOrder < aRoleOrder) return 1;
  if (bRoleOrder > aRoleOrder) return -1;
  if (aClass < bClass) return -1;
  if (aClass > bClass) return 1;
  if (aName < bName) return -1;
  if (aName > bName) return 1;

  return 0;
}

const limit = pLimit(5);
export const addInfoToSpreadsheet = async (roster: any) => {
  const sheet = doc.sheetsById[269246106];
  let values = ['name'];

  for (let i = 0; i < 6; i++) {
    values = [...values, `name${i}`, `class${i}`, `ilevel${i}`, `mscore${i}`, `mplus${i}`];
  }

  try {
    await sheet.setHeaderRow(values);
    const rows = await sheet.getRows({ limit: 30, offset: 0 });
    roster.sort(sortByNameWithRoleOrder);

    await Promise.all(
      roster.map((person: any, i: number) =>
        limit(async () => {
          const tempData = {
            name: person.name,
            ...person?.characters?.reduce(reducer, {}),
          };

          if (rows[i]) {
            values.forEach((value) => {
              rows[i][value] = tempData[value];
            });

            await rows[i].save();
          } else {
            await sheet.addRow(tempData);
          }
        }),
      ),
    );
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Characters added to spreadsheet');
  }
};

const updateCoreInSheet = () => {
  rosterRef.onSnapshot(async (doc) => {
    const rosterData = await doc.data();

    const core1 = rosterData?.core1;
    addInfoToSpreadsheet(core1);
  });
};

export default updateCoreInSheet;
