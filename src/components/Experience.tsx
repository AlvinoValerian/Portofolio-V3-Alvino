import { motion } from 'motion/react';
import { PortfolioData, Experience } from '../hooks/usePortfolioData';
import { Briefcase, Plus, Edit2, Trash2, X, Check, Calendar, MapPin, Building } from 'lucide-react';
import { useState } from 'react';

interface ExperienceProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function ExperiencePanel({ data, saveData, isAdmin }: ExperienceProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempItem, setTempItem] = useState<Partial<Experience>>({});

  const handleDelete = (id: string) => {
    saveData({ ...data, experiences: data.experiences.filter(h => h.id !== id) });
  };

  const handleAdd = () => {
    const newItem: Experience = {
      id: Date.now().toString(),
      title: 'Job Title',
      company: 'Company Name',
      startYear: '2023',
      endYear: 'Present',
      description: 'Describe your role...'
    };
    saveData({ ...data, experiences: [...data.experiences, newItem] });
  };

  const handleSave = (id: string) => {
    saveData({
      ...data,
      experiences: data.experiences.map(e => e.id === id ? { ...e, ...tempItem } as Experience : e)
    });
    setIsEditing(null);
  };

  return (
    <section id="experience" className="min-h-screen py-20 px-6 bg-white/[0.02] snap-start flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
            <Briefcase size={16} />
          </div>
          <h3 className="section-title">Professional Path</h3>
          {isAdmin && (
            <button onClick={handleAdd} className="ml-auto p-2 glass rounded-full hover:text-white text-white/40 transition-colors">
              <Plus size={18} />
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 md:p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all group relative"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setIsEditing(exp.id); setTempItem(exp); }} className="p-1.5 bg-white/5 rounded-lg"><Edit2 size={12}/></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-1.5 bg-red-400/10 text-red-400 rounded-lg"><Trash2 size={12}/></button>
                </div>
              )}

              {isEditing === exp.id ? (
                <div className="space-y-3 w-full">
                   <input className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm outline-none" value={tempItem.title} onChange={e => setTempItem({...tempItem, title: e.target.value})} placeholder="Title" />
                   <input className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm outline-none" value={tempItem.company} onChange={e => setTempItem({...tempItem, company: e.target.value})} placeholder="Company" />
                   <div className="flex gap-2">
                     <input className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none" value={tempItem.startYear} onChange={e => setTempItem({...tempItem, startYear: e.target.value})} placeholder="Start Year" />
                     <input className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none" value={tempItem.endYear} onChange={e => setTempItem({...tempItem, endYear: e.target.value})} placeholder="End Year" />
                   </div>
                   <textarea className="w-full bg-white/5 border border-white/10 p-2 rounded h-24 text-sm outline-none" value={tempItem.description} onChange={e => setTempItem({...tempItem, description: e.target.value})} placeholder="Description" />
                   <div className="flex gap-2">
                      <button onClick={() => handleSave(exp.id)} className="px-4 py-2 bg-primary rounded-lg text-xs font-bold">SAVE</button>
                      <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">CANCEL</button>
                   </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono font-bold uppercase whitespace-nowrap flex items-center gap-1.5 border border-primary/20">
                      <Calendar size={10} />
                      {exp.startYear} — {exp.endYear}
                    </span>
                    <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-mono uppercase tracking-wider">
                      <Building size={10} />
                      {exp.company}
                    </div>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{exp.title}</h4>
                  </div>
                  <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{exp.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
