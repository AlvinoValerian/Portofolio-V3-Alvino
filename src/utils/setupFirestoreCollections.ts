import {
  doc,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { PortfolioData } from '../hooks/usePortfolioData';

/**
 * DEFAULT_DATA - Single source of truth untuk semua data default
 * Gunakan di setiap file yang butuh default data
 */
export const DEFAULT_DATA: PortfolioData = {
  about: {
    name: "Alvino",
    role: "Fullstack Developer, UI Designer & Automation Enthusiast",
    description: "Saya mahasiswa Teknik Informatika di Politeknik Negeri Malang yang berfokus pada pengembangan solusi digital yang menggabungkan desain, fungsionalitas, dan automasi. Memiliki keahlian di bidang UI/UX Design dan Web Development menggunakan React, Next.js, TypeScript, Laravel, dan MySQL, serta mampu membangun sistem automation dan integrasi untuk meningkatkan efisiensi proses digital. Saya antusias dalam menciptakan aplikasi interaktif dan solusi inovatif berbasis teknologi untuk menjawab tantangan industri masa depan.",
    photo: "https://i.imgur.com/62ngWnG.jpeg",
    cvUrl: "https://drive.google.com/file/d/1nFC6lcMmXKVNYBlWlsoJTMsvk6_FPfsP/view?usp=sharing",
    headline: ""
  },
  education: [
    {
      id: 'edu_sample_1',
      school: 'SMKn 12 Malang',
      degree: 'Multimedia',
      year: '2020 - 2023',
      description: 'fokus design dan fotografi'
    }
  ],
  skills: [
    { id: 'skill_1', name: 'Figma', category: 'ui-design' },
    { id: 'skill_2', name: 'HTML', category: 'frontend' },
    { id: 'skill_3', name: 'CSS', category: 'frontend' },
    { id: 'skill_4', name: 'React.js', category: 'frontend' },
    { id: 'skill_5', name: 'TypeScript', category: 'frontend' },
    { id: 'skill_6', name: 'Tailwind CSS', category: 'frontend' },
    { id: 'skill_7', name: 'Firebase', category: 'backend' },
    { id: 'skill_8', name: 'Node.js', category: 'backend' }
  ],
  projects: [
    {
      id: 'project_sample_1',
      title: 'Modern Portfolio',
      description: 'A professional portfolio with dynamic content management using React and Firebase.',
      image: '/project_placeholder.png',
      github: 'https://github.com',
      figma: 'https://figma.com',
      liveUrl: 'https://example.com'
    }
  ],
  experiences: [
    {
      id: 'exp_sample_1',
      title: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      startYear: '2023',
      endYear: '2024',
      description: 'Worked on building responsive UI components using React and Tailwind.'
    }
  ],
  documents: [
    {
      id: 'doc_sample_1',
      name: 'CV',
      url: 'https://example.com/cv.pdf'
    }
  ],
  socials: [
    { id: 'social_1', label: 'LinkedIn', url: 'https://linkedin.com' },
    { id: 'social_2', label: 'GitHub', url: 'https://github.com' },
    { id: 'social_3', label: 'Email', url: 'mailto:alvino@example.com' }
  ]
};

/**
 * Initialize semua Firestore collections dengan data default
 * Jalankan function ini sekali saat setup pertama kali
 */
export async function setupFirestoreCollections() {
  try {
    const batch = writeBatch(db);

    // 1. Setup Admin Collection
    const adminPasswordRef = doc(db, 'admin', 'password');
    batch.set(adminPasswordRef, {
      value: 'admin31',
      createdAt: new Date(),
      lastUpdated: new Date()
    }, { merge: true });

    // 2. Setup Portfolio Collection (About/Profile)
    const aboutRef = doc(db, 'portfolio', 'about');
    batch.set(aboutRef, DEFAULT_DATA.about, { merge: true });

    // 3. Setup Education Collection dengan sample data
    const educationRef = doc(db, 'education', 'edu_sample_1');
    batch.set(educationRef, {
      id: 'edu_sample_1',
      school: 'SMKn 12 Malang',
      degree: 'Multimedia',
      year: '2020 - 2023',
      description: 'fokus design dan fotografi'
    }, { merge: true });

    // 4. Setup Skills Collection dengan sample data
    const skillsData = [
      { id: 'skill_1', name: 'Figma', category: 'ui-design' },
      { id: 'skill_2', name: 'HTML', category: 'frontend' },
      { id: 'skill_3', name: 'CSS', category: 'frontend' },
      { id: 'skill_4', name: 'React.js', category: 'frontend' },
      { id: 'skill_5', name: 'TypeScript', category: 'frontend' },
      { id: 'skill_6', name: 'Tailwind CSS', category: 'frontend' },
      { id: 'skill_7', name: 'Firebase', category: 'backend' },
      { id: 'skill_8', name: 'Node.js', category: 'backend' }
    ];

    skillsData.forEach(skill => {
      const skillRef = doc(db, 'skills', skill.id);
      batch.set(skillRef, skill, { merge: true });
    });

    // 5. Setup Projects Collection dengan sample data
    const projectRef = doc(db, 'projects', 'project_sample_1');
    batch.set(projectRef, {
      id: 'project_sample_1',
      title: 'Pencatatan Prestasi Mahasiswa',
      description: 'Sebuah platform berbasis web yang dirancang untuk mendigitalisasi dan mengelola data pencapaian mahasiswa di Jurusan Teknologi Informasi. Proyek ini mengintegrasikan sistem pengajuan prestasi, validasi oleh admin, hingga rekapitulasi data secara otomatis.',
      image: 'https://i.imgur.com/vzl4Vk6.jpeg',
      github: '',
      figma: 'https://www.figma.com/design/fFl1G2cUPLYtwGBJiDHKJV/MOCKUP?node-id=0-1&t=t29FUAlrEQJ8Remq-0',
      liveUrl: ''
    }, { merge: true });

    // 6. Setup Experiences Collection dengan sample data
    const experienceRef = doc(db, 'experiences', 'exp_sample_1');
    batch.set(experienceRef, {
      id: 'exp_sample_1',
      title: 'Magang / Asisten Fotografer dan Editor',
      company: 'Ammora Photography',
      startYear: '2022',
      endYear: '2022',
      description: 'Bekerja Sebagai Asisten Fotografer dan Editor di Ammora Photography, sebuah studio fotografi yang berfokus pada pemotretan pernikahan, acara, dan potret. Tugas utama meliputi membantu proses pemotretan, mengelola peralatan, serta melakukan editing foto menggunakan Adobe Lightroom dan Photoshop untuk menghasilkan hasil akhir yang berkualitas tinggi.'
    }, { merge: true });

    // 7. Setup Documents Collection dengan sample data
    const docRef = doc(db, 'documents', 'doc_sample_1');
    batch.set(docRef, {
      id: 'doc_sample_1',
      name: 'Curriculum Vitae',
      url: 'https://drive.google.com/file/d/1nFC6lcMmXKVNYBlWlsoJTMsvk6_FPfsP/view?usp=sharing'
    }, { merge: true });

    // 8. Setup Socials/Contact Collection dengan sample data
    const socialData = [
      { id: 'social_1', label: 'LinkedIn', url: 'https://www.linkedin.com/in/alvino-valerian' },
      { id: 'social_2', label: 'GitHub', url: 'https://github.com/AlvinoValerian' },
      { id: 'social_3', label: 'Email', url: 'mailto:alvino41127@gmail.com' }
    ];

    socialData.forEach(social => {
      const socialRef = doc(db, 'socials', social.id);
      batch.set(socialRef, social, { merge: true });
    });

    // Commit semua perubahan sekaligus
    await batch.commit();
    console.log('✅ Firestore collections initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error setting up Firestore collections:', error);
    throw error;
  }
}

/**
 * Cek apakah collections sudah setup
 */
export async function checkFirestoreSetup(): Promise<boolean> {
  try {
    const adminDoc = await getDoc(doc(db, 'admin', 'password'));
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking Firestore setup:', error);
    return false;
  }
}
