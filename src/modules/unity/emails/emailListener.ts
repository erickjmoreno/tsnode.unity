import getApplyEmail from './getApplyEmail';
import getResponseEmail from './getResponseEmail';
import type { HandleEmailListener, ApplyWithAnswer, Apply, SendMailReturn } from './types';

const handleEmailListener: HandleEmailListener = (args) => async (snapShot) => {
  const { emailTransporter, to, ref } = args;
  const applyNotificationEmails: SendMailReturn[] = [];
  const responseEmails: SendMailReturn[] = [];
  const appliesSentById: string[] = [];
  const answersSentById: [string, number][] = [];

  snapShot.docChanges().forEach(async (change) => {
    const apply = change.doc.data() as Apply;
    const applyAlreadyNotified = change.type !== 'added' || apply.emailSent;
    const hasMissingResponses =
      (change.type === 'modified' || change.type === 'added') &&
      apply.answer &&
      apply.answer.length > 0 &&
      apply.answersSent !== apply.answer?.length;

    if (hasMissingResponses) {
      const { answersCount, email } = getResponseEmail({
        apply: apply as ApplyWithAnswer,
        emailTransporter,
      });
      answersSentById.push([change.doc.id, answersCount]);
      responseEmails.push(email);
    }

    if (applyAlreadyNotified) return;

    const email = getApplyEmail({ apply, emailTransporter, to });
    applyNotificationEmails.push(email);
    appliesSentById.push(change.doc.id);
  });

  const appliesSent = await Promise.allSettled(applyNotificationEmails);
  const markAsSentList = appliesSentById
    .filter((_, index) => appliesSent?.[index].status === 'fulfilled')
    .map((id) => ref.doc(id).update({ emailSent: true }));

  const markedAsSent = await Promise.allSettled(markAsSentList);
  if (markedAsSent.length > 0)
    console.log(`email sent to: ${to} with ${markedAsSent.length} applies`);

  const answersSent = await Promise.allSettled(responseEmails);
  const markedAsAnswered = answersSentById
    .filter((_, index) => answersSent?.[index].status === 'fulfilled')
    .map(([id, answersSent]) => ref.doc(id).update({ answersSent }));

  await Promise.allSettled(markedAsAnswered);
  if (markedAsAnswered.length > 0) console.log(`responses sent ${markedAsAnswered.length}`);
};

export default handleEmailListener;
