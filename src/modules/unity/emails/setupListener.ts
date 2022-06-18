import nodemailer from 'nodemailer';
import { firestore } from '@modules/firebase';
import { core1Emails, core2Emails, emailUsername, emailPassword } from '@configs/env';
import handleEmailListener from './emailListener';

const appliesCore1Ref = firestore.collection('Unity/applies/core1');
const appliesCore2Ref = firestore.collection('Unity/applies/core2');

const setupListener = async () => {
  try {
    const emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const core1EmailTransporter = handleEmailListener({
      emailTransporter,
      to: core1Emails,
      ref: appliesCore1Ref,
    });

    const core2EmailTransporter = handleEmailListener({
      emailTransporter,
      to: core2Emails,
      ref: appliesCore2Ref,
    });

    appliesCore1Ref.onSnapshot(core1EmailTransporter);
    appliesCore2Ref.onSnapshot(core2EmailTransporter);
  } catch (error) {
    console.log(error);
  }
};

export default setupListener;
