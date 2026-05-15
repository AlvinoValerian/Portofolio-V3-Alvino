import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioData, PortfolioData, Social } from '../hooks/usePortfolioData';
import { Plus, X, Check, Globe, Github, Linkedin, Twitter, Instagram, Mail, Youtube } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface FooterProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

const getSocialIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('github')) return Github;
  if (l.includes('linkedin')) return Linkedin;
  if (l.includes('twitter')) return Twitter;
  if (l.includes('instagram')) return Instagram;
  if (l.includes('email') || l.includes('mail')) return Mail;
  if (l.includes('youtube')) return Youtube;
  return Globe;
};

export default function Footer({ data, saveData, isAdmin }: FooterProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSocial, setNewSocial] = useState({ label: '', url: '' });

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (newSocial.label && newSocial.url) {
      const updatedSocials = [...(data.socials || []), { ...newSocial, id: Date.now().toString() }];
      saveData({ ...data, socials: updatedSocials });
      setNewSocial({ label: '', url: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    const updatedSocials = data.socials.filter(s => s.id !== id);
    saveData({ ...data, socials: updatedSocials });
  };

  return (
    <footer className="py-16 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between border-t border-white/10 relative snap-start">
      <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em] mb-12 md:mb-0 text-center md:text-left">
        © 2026 DESIGNED BY {data.about.name.toUpperCase()}. ALL RIGHTS RESERVED.
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {data.socials?.map((social) => {
          const Icon = getSocialIcon(social.label);
          return (
            <div key={social.id} className="relative group">
              <a href={social.url} target="_blank" className="text-white/60 hover:text-primary transition-all flex items-center gap-2 group/link" referrerPolicy="no-referrer">
                <Icon size={14} className="group-hover/link:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{social.label}</span>
              </a>
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(social.id)}
                  className="absolute -top-1 -right-2 p-1 bg-red-400 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <X size={8} />
                </button>
              )}
            </div>
          );
        })}
        {isAdmin && (
          <button 
            onClick={() => setIsAdding(true)}
            className="p-2 border border-dashed border-white/20 rounded-full text-white/40 hover:text-white hover:border-white/40 transition-colors"
          >
            <Plus size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
          >
            <form onSubmit={handleAdd} className="glass p-8 rounded-[2rem] max-w-sm w-full space-y-4">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-bold uppercase tracking-widest">Add Social Link</h3>
                 <button type="button" onClick={() => setIsAdding(false)}><X size={18} /></button>
               </div>
               <input 
                 className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none"
                 placeholder="Label (e.g. Instagram)"
                 value={newSocial.label}
                 onChange={e => setNewSocial({...newSocial, label: e.target.value})}
               />
               <input 
                 className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
                 placeholder="URL (https://...)"
                 value={newSocial.url}
                 onChange={e => setNewSocial({...newSocial, url: e.target.value})}
               />
               <button className="w-full bg-primary py-4 rounded-xl font-bold text-xs uppercase tracking-widest">
                 SAVE LINK
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
