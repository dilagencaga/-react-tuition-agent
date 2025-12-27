import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSknztmet6QVWMenB_LPh-0UxZWI-1OsI",
  authDomain: "se4458-tuition-chat.firebaseapp.com",
  databaseURL: "https://se4458-tuition-chat-default-rtdb.firebaseio.com",
  projectId: "se4458-tuition-chat",
  storageBucket: "se4458-tuition-chat.firebasestorage.app",
  messagingSenderId: "393114146436",
  appId: "1:393114146436:web:353696e05cc65ba69914d1",
  measurementId: "G-1K1663JFT6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveMessage = async (sessionId, message, role, metadata = {}) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      sessionId,
      message,
      role,
      metadata,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

export const subscribeToMessages = (sessionId, callback) => {
  const q = query(
    collection(db, 'messages'),
    where('sessionId', '==', sessionId),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  }, (error) => {
    console.error('Firebase subscription error:', error);
  });
};
