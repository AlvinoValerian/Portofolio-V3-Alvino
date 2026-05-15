import { motion } from 'motion/react';
import { PortfolioData, Skill } from '../hooks/usePortfolioData';
import { Plus, X, Trash2, Palette, Layout, Database, Cpu } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface SkillsProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function Skills({ data, saveData, isAdmin }: SkillsProps) {
  const [newSkill, setNewSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState<Skill['category']>('frontend');

  const categories: { id: Skill['category'], label: string, icon: any }[] = [
    { id: 'ui-design', label: 'UI Design', icon: Palette },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'backend', label: 'Backend', icon: Database },
  ];

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newSkill) return;
    const item: Skill = {
      id: Date.now().toString(),
      name: newSkill,
      category: activeCategory
    };
    saveData({ ...data, skills: [...data.skills, item] });
    setNewSkill('');
  };

  const handleDelete = (id: string) => {
    saveData({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  return (
    <section id="skills" className="min-h-screen py-20 px-6 bg-white/[0.02] snap-start flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
            <Cpu size={18} />
          </div>
          <h3 className="section-title">Technical Stack</h3>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-3xl group hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                      <cat.icon size={18} />
                    </div>
                    <span className="text-mono-label">{cat.label}</span>
                 </div>
                 {isAdmin && (
                   <button 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`p-1.5 rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white/5 text-white/40'}`}
                   >
                     <Plus size={14} />
                   </button>
                 )}
              </div>

              <div className="flex flex-wrap gap-2">
                {data.skills.filter(s => s.category === cat.id).map((skill) => (
                  <motion.div 
                    layout
                    key={skill.id}
                    className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs flex items-center gap-2 group hover:border-white/20 transition-all"
                  >
                    <span>{skill.name}</span>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDelete(skill.id)}
                        className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </motion.div>
                ))}
                
                {isAdmin && activeCategory === cat.id && (
                  <form onSubmit={handleAdd} className="w-full mt-4">
                    <input 
                      type="text"
                      placeholder="Add to stack..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="w-full bg-white/5 border border-dashed border-white/20 p-2 rounded-lg outline-none text-xs focus:border-primary/50 transition-colors"
                    />
                  </form>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
