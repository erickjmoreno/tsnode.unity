import { FROM } from '@constants/mail';
import type { HandleApplyEmailsArgs } from './types';

const getApplyEmail = ({ apply, emailTransporter, to }: HandleApplyEmailsArgs) => {
  const contentText = apply.questions
    .map(({ question, answer }) => `${question} \n ${answer}`)
    .join('\n');

  const contentHtml = apply.questions
    .map(
      ({ question, answer }, index) => `<b>${index + 1} - ${question}</b> <br /> ${answer} <br />`,
    )
    .join('<br />');

  const email = emailTransporter.sendMail({
    to,
    from: FROM,
    subject: `Aplicación de ${apply.questions[0].answer}`,
    text: contentText,
    html: contentHtml,
  });

  return email;
};

export default getApplyEmail;
