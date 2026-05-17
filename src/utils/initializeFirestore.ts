import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DEFAULT_DATA } from './setupFirestoreCollections';

/**
 * Initialize Firestore dengan data default jika belum ada
 */
export async function initializeFirestoreData() {
  try {
    // Cek apakah admin password sudah ada
    const adminDoc = await getDoc(doc(db, 'admin', 'password'));
    
    if (!adminDoc.exists()) {
      // Set default password jika belum ada
      await setDoc(doc(db, 'admin', 'password'), { 
        value: 'admin31',
        createdAt: new Date()
      });
      console.log('Admin password initialized');
    }

    // Cek apakah about profile sudah ada
    const aboutDoc = await getDoc(doc(db, 'portfolio', 'about'));
    if (!aboutDoc.exists()) {
      await setDoc(doc(db, 'portfolio', 'about'), DEFAULT_DATA.about);
      console.log('About profile initialized');
    }
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}
