import { LogIn, Menu, Settings, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function Navbar({ isAdmin, setIsAdmin }: NavbarProps) {
  const { data } = usePortfolioData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Academic', href: '#education' },
    { name: 'Skill', href: '#skills' },
    { name: 'Project', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Dokumen', href: '#documents' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-primary transition-colors">
            <span className="text-xl font-display font-black tracking-tighter text-white group-hover:text-black transition-colors">
              A
              <span className="text-primary group-hover:text-white transition-colors">V</span>
            </span>
          </div>
        </motion.div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`relative text-[10px] font-bold uppercase tracking-widest transition-colors py-1 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:block">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${isAdmin ? 'bg-primary text-white' : 'bg-white text-black hover:bg-primary hover:text-white'}`}
            >
              {isAdmin ? 'ADMIN ACTIVE' : 'ADMIN LOGIN'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-2 rounded-full transition-colors ${isAdmin ? 'text-blue-400 bg-blue-400/10' : 'text-white/40 hover:text-white'}`}
            >
               {isAdmin ? <Settings size={18} /> : <LogIn size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/60">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 p-4 glass rounded-2xl flex flex-col gap-4"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors p-2 rounded-lg flex items-center justify-between ${
                  isActive ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavMobile"
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </a>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
