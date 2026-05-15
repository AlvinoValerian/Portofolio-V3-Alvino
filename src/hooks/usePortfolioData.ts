import { useState, useEffect } from 'react';

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'ui-design' | 'frontend' | 'backend';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  figma?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
}

export interface Social {
  id: string;
  label: string;
  url: string;
}

export interface PortfolioData {
  about: {
    name: string;
    role: string;
    description: string;
    photo: string;
    cvUrl: string;
    headline: string;
  };
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  documents: Document[];
  socials: Social[];
}

const DEFAULT_DATA: PortfolioData = {
  about: {
    name: "Alvino",
    role: "Fullstack Developer & UI Designer",
    description: "I am a passionate developer with a focus on creating beautiful and functional web applications. I love learning new technologies and solving complex problems.",
    photo: "/profile_placeholder.png",
    cvUrl: "#",
    headline: "crafting purposeful digital solutions."
  },
  education: [
    {
      id: '1',
      school: 'University Name',
      degree: 'Bachelor of Computer Science',
      year: '2020 - 2024',
      description: 'Focused on web engineering and user interface design.'
    }
  ],
  skills: [
    { id: '1', name: 'Figma', category: 'ui-design' },
    { id: '2', name: 'HTML', category: 'frontend' },
    { id: '3', name: 'CSS', category: 'frontend' },
    { id: '4', name: 'SCSS', category: 'frontend' },
    { id: '5', name: 'JavaScript', category: 'frontend' },
    { id: '6', name: 'React.js', category: 'frontend' },
    { id: '7', name: 'Next.js', category: 'frontend' },
    { id: '8', name: 'TypeScript', category: 'frontend' },
    { id: '9', name: 'Tailwind CSS', category: 'frontend' },
    { id: '10', name: 'Bootstrap', category: 'frontend' },
    { id: '11', name: 'Laravel', category: 'backend' },
    { id: '12', name: 'PHP', category: 'backend' },
    { id: '13', name: 'MySQL', category: 'backend' },
    { id: '14', name: 'SQL Server', category: 'backend' },
    { id: '15', name: 'Python', category: 'backend' },
    { id: '16', name: 'Firebase', category: 'backend' }
  ],
  projects: [
    {
      id: '1',
      title: 'Modern Portfolio',
      description: 'A professional portfolio with dynamic content management.',
      image: '/project_placeholder.png',
      github: 'https://github.com',
      figma: 'https://figma.com'
    }
  ],
  experiences: [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      startYear: '2023',
      endYear: '2024',
      description: 'Worked on building responsive UI components using React and Tailwind.'
    }
  ],
  documents: [
    { id: '1', name: 'CV', url: '#' },
    { id: '2', name: 'Transcript', url: '#' }
  ],
  socials: [
    { id: '1', label: 'LinkedIn', url: '#' },
    { id: '2', label: 'GitHub', url: '#' },
    { id: '3', label: 'Email', url: 'mailto:alvino@example.com' }
  ]
};

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  return { data, saveData, isLoaded };
}
