import { updateCore } from '@modules/unity/rosterUpdate';
// import setupListener from '@modules/unity/emails/setupListener';
import setupDiscord from '@modules/discord/setup';
import setupSpreadsheet from '@modules/spreadsheet';

const init = async () => {
  updateCore();
  setupDiscord();
  setupSpreadsheet();

  // Mail listener is living in other copy of this project to avoid corruption
  // setupListener();
};

init();
