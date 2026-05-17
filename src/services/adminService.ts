import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    const adminDoc = await getDoc(doc(db, 'admin', 'password'));
    if (!adminDoc.exists()) {
      console.warn('Admin password not set in Firestore');
      return false;
    }
    const storedPassword = adminDoc.data().value;
    return password === storedPassword;
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return false;
  }
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  try {
    await setDoc(doc(db, 'admin', 'password'), { value: newPassword });
  } catch (error) {
    console.error('Error setting admin password:', error);
    throw error;
  }
}

export async function getAdminPassword(): Promise<string | null> {
  try {
    const adminDoc = await getDoc(doc(db, 'admin', 'password'));
    if (adminDoc.exists()) {
      return adminDoc.data().value;
    }
    return null;
  } catch (error) {
    console.error('Error getting admin password:', error);
    return null;
  }
}
