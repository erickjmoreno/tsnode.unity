// import { updateCore } from '@modules/unity/rosterUpdate';
import setupListener from '@modules/unity/emails/setupListener';

const init = async () => {
  // updateCore();
  setupListener();
};

init();
