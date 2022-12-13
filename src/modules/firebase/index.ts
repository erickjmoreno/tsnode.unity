import { getFirestore } from 'firebase-admin/firestore';
import type { ServiceAccount } from 'firebase-admin/app';
import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from '../../../serviceAccountKey.json' assert { type: 'json' };

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const firestore = getFirestore(app);
