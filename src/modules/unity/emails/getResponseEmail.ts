import { TEXT_SIGNATURE, FROM, HTML_SIGNATURE } from '@constants/mail';
import type { HandleResponseEmailsArgs } from './types';

const getResponseEmail = ({ apply, emailTransporter }: HandleResponseEmailsArgs) => {
  const mail = apply.questions[3].answer;
  const answersAlreadySentCount = apply.answersSent || 0;
  const answersCount = apply.answer.length || 0;
  const startingPoint = answersAlreadySentCount - answersCount;

  const answersToSend = apply.answer.filter((_, index) => index + 1 > startingPoint);
  const completeAnswer = answersToSend?.join('!separator!') || '';

  const email = emailTransporter.sendMail({
    from: FROM,
    to: mail,
    subject: 'Respuesta a tu Aplicación',
    text: `${completeAnswer.replace('!separator!', '</ br> </ br>')} ${TEXT_SIGNATURE}`,
    html: `${completeAnswer.replace('!separator!', '\n \n')} ${HTML_SIGNATURE}`,
  });

  return { answersCount, email };
};

export default getResponseEmail;
