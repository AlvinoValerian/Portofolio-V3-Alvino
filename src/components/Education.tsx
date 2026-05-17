import { Building, Calendar, Edit2, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Education, PortfolioData } from '../hooks/usePortfolioData';

interface EducationProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function EducationPanel({ data, saveData, isAdmin }: EducationProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempItem, setTempItem] = useState<Partial<Education>>({});

  const handleDelete = (id: string) => {
    saveData({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  const handleAdd = () => {
    const newItem: Education = {
      id: Date.now().toString(),
      school: 'New School',
      degree: 'Degree Name',
      year: 'Year - Year',
      description: 'Short description...'
    };
    saveData({
      ...data,
      education: [...data.education, newItem]
    });
    setIsEditing(newItem.id);
    setTempItem(newItem);
  };

  const handleSave = (id: string) => {
    saveData({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, ...tempItem } as Education : e)
    });
    setIsEditing(null);
  };

  return (
    <section id="education" className="min-h-screen py-20 px-6 snap-start flex items-center">
      <div className="max-w-4xl pl-20 pr-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
          <h3 className="section-title">Academic Path</h3>
          {isAdmin && (
            <button 
              onClick={handleAdd}
              className="ml-auto p-2 glass rounded-full text-white/40 hover:text-white transition-colors"
            >
              <Plus size={18} />
            </button>
          )}
        </motion.div>

        <div className="relative border-l border-white/10 ml-4.25 space-y-12">
          {data.education.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              <div className={`absolute -left-1.25 top-1 w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-primary shadow-[0_0_8px_#3b82f6]' : 'bg-white/20'}`} />
              
              <div className="group relative">
                {isAdmin && (
                  <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={() => { setIsEditing(item.id); setTempItem(item); }}
                      className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-red-400/10 text-red-400 rounded-lg hover:bg-red-400/20"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

                {isEditing === item.id ? (
                  <div className="glass p-6 rounded-2xl space-y-4">
                    <input 
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm"
                      value={tempItem.school}
                      onChange={e => setTempItem({ ...tempItem, school: e.target.value })}
                      placeholder="School"
                    />
                    <input 
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm"
                      value={tempItem.degree}
                      onChange={e => setTempItem({ ...tempItem, degree: e.target.value })}
                      placeholder="Degree"
                    />
                    <input 
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm font-mono"
                      value={tempItem.year}
                      onChange={e => setTempItem({ ...tempItem, year: e.target.value })}
                      placeholder="Year"
                    />
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs h-24"
                      value={tempItem.description}
                      onChange={e => setTempItem({ ...tempItem, description: e.target.value })}
                      placeholder="Description"
                    />
                    <div className="flex gap-2">
                       <button onClick={() => handleSave(item.id)} className="px-4 py-2 bg-primary rounded-lg text-xs font-bold">SAVE</button>
                       <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] text-primary font-mono mb-1 uppercase font-bold flex items-center gap-2">
                      <Calendar size={10} />
                      {item.year}
                    </p>
                    <h4 className="text-xl font-bold mb-1 flex items-center gap-3">
                      <Building size={18} className="text-white/20" />
                      {item.school}
                    </h4>
                    <div className="text-white/50 text-sm mb-3 flex items-center gap-2">
                      <div className="p-1 px-2 bg-primary/10 rounded-md">
                        <GraduationCap size={12} className="text-primary" />
                      </div>
                      {item.degree}
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed max-w-xl pl-8">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
