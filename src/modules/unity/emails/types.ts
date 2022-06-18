import type nodemailer from 'nodemailer';
import type { Timestamp, QuerySnapshot } from 'firebase-admin/firestore';
import type { firestore } from '@modules/firebase';

export interface question {
  answer: string;
  officerString: string;
  question: string;
  style: string;
}

export interface Apply {
  date: Timestamp;
  questions: question[];
  answer?: string[];
  emailSent?: boolean;
  answersSent?: number;
}

type EmailTransporter = ReturnType<typeof nodemailer.createTransport>;
export type SendMailReturn = ReturnType<EmailTransporter['sendMail']>;

export interface HandleApplyListenersArgs {
  emailTransporter: EmailTransporter;
  to: string;
  ref: ReturnType<typeof firestore.collection>;
}

export interface ApplyWithAnswer extends Omit<Apply, 'answer'> {
  answer: string[];
}

export interface HandleResponseEmailsArgs {
  apply: ApplyWithAnswer;
  emailTransporter: EmailTransporter;
}

export interface HandleApplyEmailsArgs {
  apply: Apply;
  emailTransporter: EmailTransporter;
  to: string;
}

export type HandleEmailListener = (
  args: HandleApplyListenersArgs,
) => <T extends QuerySnapshot>(snapshot: T) => Promise<void>;
