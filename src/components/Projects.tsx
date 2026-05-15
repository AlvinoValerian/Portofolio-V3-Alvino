import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, Project } from '../hooks/usePortfolioData';
import { Github, Figma, ExternalLink, Plus, Edit2, Trash2, X, Check, Code } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface ProjectsProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function Projects({ data, saveData, isAdmin }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState<Project | null>(null);

  const handleAdd = () => {
    const newItem: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Describe your project here...',
      image: 'https://picsum.photos/seed/project/800/600',
      github: '',
      figma: '',
      liveUrl: ''
    };
    saveData({ ...data, projects: [...data.projects, newItem] });
  };

  const handleDelete = (id: string) => {
    saveData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;
    saveData({
      ...data,
      projects: data.projects.map(p => p.id === isEditing.id ? isEditing : p)
    });
    setIsEditing(null);
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-6 snap-start flex items-center">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
            <Code size={18} />
          </div>
          <h3 className="section-title">Selected Projects</h3>
          {isAdmin && (
            <button onClick={handleAdd} className="ml-auto p-2 glass rounded-full hover:text-white text-white/40 transition-colors">
              <Plus size={20} />
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2rem] bg-black border border-white/10 aspect-video cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/800/600`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                 {isAdmin && (
                   <div className="absolute top-6 right-6 flex gap-2 z-10" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setIsEditing(project)} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"><Edit2 size={12} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400/20 transition-colors"><Trash2 size={12} /></button>
                   </div>
                 )}
                <h4 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {project.github && <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-tighter">GITHUB</span>}
                  {project.figma && <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-tighter">FIGMA</span>}
                  {project.liveUrl && <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-tighter">LIVE</span>}
                  <span className="text-[10px] font-mono text-white/40 font-bold uppercase tracking-tighter">— VIEW DETAILS</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass max-w-2xl w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden overflow-y-auto max-h-[90vh] custom-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video w-full">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-1">{selectedProject.title}</h2>
                    <span className="text-mono-label">Case Study</span>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 glass rounded-full hover:bg-white/10"><X size={20} /></button>
                </div>
                <p className="text-white/60 mb-8 leading-relaxed text-sm">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 glass-accent px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black">
                      <Github size={14} /> GITHUB
                    </a>
                  )}
                  {selectedProject.figma && (
                    <a href={selectedProject.figma} target="_blank" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 glass-accent px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-pink-400 border-pink-400/10 transition-all hover:bg-pink-400 hover:text-white">
                      <Figma size={14} /> FIGMA
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 glass-accent px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-400 border-emerald-400/10 transition-all hover:bg-emerald-400 hover:text-white">
                      <ExternalLink size={14} /> LIVE APP
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <form onSubmit={handleSave} className="glass max-w-lg w-full p-8 rounded-[2.5rem] space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold uppercase tracking-widest">Edit Project</h2>
                <button type="button" onClick={() => setIsEditing(null)} className="p-2 bg-white/5 rounded-full"><X size={18} /></button>
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none"
                placeholder="Title"
                value={isEditing.title}
                onChange={e => setIsEditing({ ...isEditing, title: e.target.value })}
              />
              <textarea 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-32 text-sm outline-none"
                placeholder="Description"
                value={isEditing.description}
                onChange={e => setIsEditing({ ...isEditing, description: e.target.value })}
              />
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
                placeholder="Image URL"
                value={isEditing.image}
                onChange={e => setIsEditing({ ...isEditing, image: e.target.value })}
              />
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
                placeholder="GitHub Link"
                value={isEditing.github}
                onChange={e => setIsEditing({ ...isEditing, github: e.target.value })}
              />
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
                placeholder="Figma Link"
                value={isEditing.figma}
                onChange={e => setIsEditing({ ...isEditing, figma: e.target.value })}
              />
              <input 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
                placeholder="Live App Link"
                value={isEditing.liveUrl}
                onChange={e => setIsEditing({ ...isEditing, liveUrl: e.target.value })}
              />
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-colors">
                <Check size={16} className="inline mr-2" /> Update Project
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
