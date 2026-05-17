/**
 * FIRESTORE COLLECTION STRUCTURE & SETUP GUIDE
 * 
 * Struktur database Firestore untuk aplikasi portfolio:
 * 
 * /admin/password
 *   - value: string (password admin)
 *   - createdAt: timestamp
 * 
 * /portfolio/about
 *   - name: string
 *   - role: string
 *   - description: string
 *   - photo: string (URL)
 *   - cvUrl: string (URL)
 *   - headline: string
 * 
 * /education/{id}
 *   - id: string (document ID)
 *   - school: string
 *   - degree: string
 *   - year: string
 *   - description: string
 * 
 * /skills/{id}
 *   - id: string (document ID)
 *   - name: string
 *   - category: 'ui-design' | 'frontend' | 'backend'
 * 
 * /projects/{id}
 *   - id: string (document ID)
 *   - title: string
 *   - description: string
 *   - image: string (URL)
 *   - github?: string (URL)
 *   - figma?: string (URL)
 *   - liveUrl?: string (URL)
 * 
 * /experiences/{id}
 *   - id: string (document ID)
 *   - title: string
 *   - company: string
 *   - startYear: string
 *   - endYear: string
 *   - description: string
 * 
 * /documents/{id}
 *   - id: string (document ID)
 *   - name: string
 *   - url: string (URL)
 * 
 * /socials/{id}
 *   - id: string (document ID)
 *   - label: string
 *   - url: string (URL)
 * 
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Admin password akan otomatis di-create dengan value "admin31" saat app pertama kali dijalankan
 * 
 * 2. Portfolio about data akan otomatis di-create dengan data default
 * 
 * 3. Untuk menambah data lainnya, gunakan fitur CRUD di portal (masuk dengan password)
 *    atau tambahkan langsung di Firestore Console
 * 
 * 4. Untuk mengubah admin password:
 *    - Login sebagai admin
 *    - Di Firestore Console, buka collection "admin", document "password"
 *    - Ubah field "value" dengan password baru
 * 
 * 5. Semua perubahan data akan otomatis disimpan ke Firestore
 */

export const FIRESTORE_COLLECTIONS = {
  ADMIN: 'admin',
  PORTFOLIO: 'portfolio',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCES: 'experiences',
  DOCUMENTS: 'documents',
  SOCIALS: 'socials'
} as const;

export const DEFAULT_ADMIN_PASSWORD = 'admin31';
