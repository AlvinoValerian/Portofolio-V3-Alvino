import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupFirestoreCollections } from './utils/setupFirestoreCollections';

// Setup Firestore collections on app start
setupFirestoreCollections().catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
