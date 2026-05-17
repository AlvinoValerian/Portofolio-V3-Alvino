import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { DEFAULT_DATA } from '../utils/setupFirestoreCollections';
import { Document, Education, Experience, PortfolioData, Project, Skill, Social } from './usePortfolioData';

// Initial state - kosong sampai data dari Firestore dimuat
const INITIAL_DATA: PortfolioData = {
  about: {
    name: '',
    role: '',
    description: '',
    photo: '',
    cvUrl: '',
    headline: ''
  },
  education: [],
  skills: [],
  projects: [],
  experiences: [],
  documents: [],
  socials: []
};

export function useFirestorePortfolioData() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from Firestore
  useEffect(() => {
    loadDataFromFirestore();
  }, []);

  const loadDataFromFirestore = async () => {
    const loadedData: PortfolioData = {
      ...INITIAL_DATA,
      education: [],
      skills: [],
      projects: [],
      experiences: [],
      documents: [],
      socials: []
    };

    try {
      setIsLoading(true);

      // Load about
      try {
        const aboutDoc = await getDoc(doc(db, 'portfolio', 'about'));
        if (aboutDoc.exists()) {
          loadedData.about = aboutDoc.data() as typeof DEFAULT_DATA.about;
        } else {
          await setDoc(doc(db, 'portfolio', 'about'), DEFAULT_DATA.about);
          loadedData.about = DEFAULT_DATA.about;
        }
      } catch (error) {
        console.error('Error loading about data:', error);
        loadedData.about = DEFAULT_DATA.about;
      }

      // Load education
      try {
        const educationDocs = await getDocs(collection(db, 'education'));
        loadedData.education = educationDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Education[];
      } catch (error) {
        console.error('Error loading education data:', error);
      }

      // Load skills
      try {
        const skillsDocs = await getDocs(collection(db, 'skills'));
        loadedData.skills = skillsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Skill[];
      } catch (error) {
        console.error('Error loading skills data:', error);
      }

      // Load projects
      try {
        const projectsDocs = await getDocs(collection(db, 'projects'));
        loadedData.projects = projectsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
      } catch (error) {
        console.error('Error loading projects data:', error);
      }

      // Load experiences
      try {
        const experiencesDocs = await getDocs(collection(db, 'experiences'));
        loadedData.experiences = experiencesDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Experience[];
      } catch (error) {
        console.error('Error loading experiences data:', error);
      }

      // Load documents
      try {
        const documentsDocs = await getDocs(collection(db, 'documents'));
        loadedData.documents = documentsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Document[];
      } catch (error) {
        console.error('Error loading documents data:', error);
      }

      // Load socials
      try {
        const socialsDocs = await getDocs(collection(db, 'socials'));
        loadedData.socials = socialsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Social[];
      } catch (error) {
        console.error('Error loading socials data:', error);
      }

      setData(loadedData);
    } catch (error) {
      console.error('Error loading data from Firestore:', error);
      setData(loadedData);
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const saveData = async (newData: PortfolioData) => {
    try {
      const batch = writeBatch(db);

      // Save about
      batch.set(doc(db, 'portfolio', 'about'), newData.about);

      const syncCollection = async <T extends { id: string }>(collectionName: string, items: T[]) => {
        const existingDocs = await getDocs(collection(db, collectionName));
        const newIds = new Set(items.map(item => item.id));

        existingDocs.docs.forEach(existingDoc => {
          if (!newIds.has(existingDoc.id)) {
            batch.delete(doc(db, collectionName, existingDoc.id));
          }
        });

        items.forEach(item => {
          batch.set(doc(db, collectionName, item.id), item);
        });
      };

      await syncCollection('education', newData.education);
      await syncCollection('skills', newData.skills);
      await syncCollection('projects', newData.projects);
      await syncCollection('experiences', newData.experiences);
      await syncCollection('documents', newData.documents);
      await syncCollection('socials', newData.socials);

      await batch.commit();
      setData(newData);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
      throw error;
    }
  };

  const deleteItem = async (collection_name: string, itemId: string) => {
    try {
      await deleteDoc(doc(db, collection_name, itemId));
      
      // Update local state
      setData(prevData => {
        const updatedData = { ...prevData };
        (updatedData[collection_name as keyof PortfolioData] as any[]) = 
          (updatedData[collection_name as keyof PortfolioData] as any[]).filter(
            item => item.id !== itemId
          );
        return updatedData;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };

  return { data, saveData, isLoaded, isLoading, deleteItem, reload: loadDataFromFirestore };
}
