# 📚 Cara Setup Firestore Collections

Ada **2 cara** untuk membuat collections di Firestore:

---

## **Cara 1: Setup Otomatis via Code (RECOMMENDED)** ✅

### Step 1: Import dan jalankan setup function
Buka file `src/main.tsx` dan ubah menjadi:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupFirestoreCollections } from './utils/setupFirestoreCollections';

// Setup Firestore collections saat pertama kali
setupFirestoreCollections()
  .then(() => console.log('Firestore ready!'))
  .catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Step 2: Jalankan aplikasi
```bash
npm run dev
```

Collections akan otomatis ter-create dengan data sample! 🎉

---

## **Cara 2: Manual via Firestore Console**

### Step 1: Buka Firestore Console
1. Pergi ke [Firebase Console](https://console.firebase.google.com/)
2. Pilih project `portofolio-v3-alvino`
3. Klik tab **Firestore Database**

### Step 2: Buat Collection `admin`
1. Klik **+ Create collection**
2. Nama collection: `admin`
3. Klik **Next**
4. Document ID: `password`
5. Tambah field:
   - Field: `value` | Type: String | Value: `admin31`
   - Field: `createdAt` | Type: Timestamp | Value: (sekarang)
6. Klik **Save**

### Step 3: Buat Collection `portfolio`
1. **+ Create collection**
2. Nama: `portfolio`
3. Document ID: `about`
4. Field-field:
```
name: "Alvino" (String)
role: "Fullstack Developer & UI Designer" (String)
description: "I am a passionate developer..." (String)
photo: "/profile_placeholder.png" (String)
cvUrl: "#" (String)
headline: "crafting purposeful digital solutions." (String)
```

### Step 4: Buat Collection `education`
1. **+ Create collection**
2. Nama: `education`
3. Document ID: `edu_sample_1`
4. Field-field:
```
id: "edu_sample_1" (String)
school: "University Name" (String)
degree: "Bachelor of Computer Science" (String)
year: "2020 - 2024" (String)
description: "Focused on web engineering..." (String)
```

### Step 5: Buat Collection `skills`
1. **+ Create collection**
2. Nama: `skills`
3. Document ID: `skill_1`
4. Field-field:
```
id: "skill_1" (String)
name: "Figma" (String)
category: "ui-design" (String)
```
**Ulangi untuk skills lainnya:**
- skill_2: React.js (frontend)
- skill_3: TypeScript (frontend)
- skill_4: Firebase (backend)
- dll...

### Step 6: Buat Collection `projects`
1. **+ Create collection**
2. Nama: `projects`
3. Document ID: `project_1`
4. Field-field:
```
id: "project_1" (String)
title: "Modern Portfolio" (String)
description: "A professional portfolio..." (String)
image: "/project_placeholder.png" (String)
github: "https://github.com" (String)
figma: "https://figma.com" (String)
liveUrl: "https://example.com" (String)
```

### Step 7: Buat Collection `experiences`
1. **+ Create collection**
2. Nama: `experiences`
3. Document ID: `exp_1`
4. Field-field:
```
id: "exp_1" (String)
title: "Frontend Developer Intern" (String)
company: "Tech Solutions Inc." (String)
startYear: "2023" (String)
endYear: "2024" (String)
description: "Worked on building..." (String)
```

### Step 8: Buat Collection `documents`
1. **+ Create collection**
2. Nama: `documents`
3. Document ID: `doc_1`
4. Field-field:
```
id: "doc_1" (String)
name: "CV" (String)
url: "https://example.com/cv.pdf" (String)
```

### Step 9: Buat Collection `socials`
1. **+ Create collection**
2. Nama: `socials`
3. Document ID: `social_1`
4. Field-field:
```
id: "social_1" (String)
label: "LinkedIn" (String)
url: "https://linkedin.com" (String)
```
**Ulangi untuk social lainnya:**
- social_2: GitHub
- social_3: Email
- dll...

---

## **Struktur Lengkap Firestore**

```
Firestore Database
├── admin/
│   └── password/
│       ├── value: "admin31"
│       ├── createdAt: (timestamp)
│       └── lastUpdated: (timestamp)
│
├── portfolio/
│   └── about/
│       ├── name: "Alvino"
│       ├── role: "Fullstack Developer..."
│       ├── description: "..."
│       ├── photo: "..."
│       ├── cvUrl: "..."
│       └── headline: "..."
│
├── education/
│   ├── edu_sample_1/
│   │   ├── id: "edu_sample_1"
│   │   ├── school: "..."
│   │   ├── degree: "..."
│   │   ├── year: "..."
│   │   └── description: "..."
│   └── edu_sample_2/
│
├── skills/
│   ├── skill_1/ { id, name, category }
│   ├── skill_2/ { id, name, category }
│   └── ...
│
├── projects/
│   ├── project_1/ { id, title, description, image, github, figma, liveUrl }
│   └── ...
│
├── experiences/
│   ├── exp_1/ { id, title, company, startYear, endYear, description }
│   └── ...
│
├── documents/
│   ├── doc_1/ { id, name, url }
│   └── ...
│
└── socials/
    ├── social_1/ { id, label, url }
    └── ...
```

---

## **Setelah Setup Selesai**

1. Login di portfolio dengan password `admin31`
2. Anda bisa edit/hapus/tambah data langsung dari UI
3. Semua perubahan otomatis tersimpan ke Firestore
4. Data akan sync real-time ke aplikasi

---

## **Tips & Troubleshooting**

### ❌ Data tidak muncul?
- Cek di Firestore Console apakah collections sudah ada
- Cek `.env.local` sudah terisi dengan config Firebase
- Restart aplikasi: `npm run dev`

### ❌ Login tidak bisa?
- Pastikan admin password di Firestore adalah `admin31`
- Cek Network tab di DevTools untuk error

### ✅ Ingin ubah admin password?
1. Login dengan password lama
2. Buka Firestore Console
3. Edit document `admin/password`
4. Ubah field `value` dengan password baru
5. Refresh halaman & login dengan password baru

---

**Sudah selesai? Aplikasi siap digunakan! 🚀**
