import { Check, Edit2, ExternalLink, FileText, Sparkles, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PortfolioData } from '../hooks/usePortfolioData';

interface HeroProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function Hero({ data, saveData, isAdmin }: HeroProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data.about);

  useEffect(() => {
    if (!isEditing) {
      setEditData(data.about);
    }
  }, [data.about, isEditing]);

  const handleSave = () => {
    saveData({ ...data, about: editData });
    setIsEditing(false);
  };

  return (
    <section id="about" className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden snap-start flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-12 lg:col-span-5 flex flex-col items-center text-center relative order-1 lg:order-1"
        >
          {isAdmin && (
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-0 right-0 p-2 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors z-10"
            >
              {isEditing ? <X size={14} /> : <Edit2 size={14} />}
            </button>
          )}

          <div className="relative mb-8 group">
            {/* White Glow Background */}
            <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full scale-110 pointer-events-none" />
            <div className="absolute inset-4 bg-white/10 blur-2xl rounded-full scale-125 pointer-events-none" />
            
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 relative z-10">
              <img 
                src={data.about.photo} 
                alt={data.about.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${data.about.name}/600/600`; }}
              />
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4 w-full text-left">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Name</label>
              <input 
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
                placeholder="Name"
              />
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Role</label>
              <input 
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-primary font-mono text-xs"
                placeholder="Role"
              />
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Headline</label>
              <input 
                type="text"
                value={editData.headline}
                onChange={(e) => setEditData({ ...editData, headline: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
                placeholder="Headline"
              />
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Description</label>
              <textarea 
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-32 outline-none text-white/60 text-sm"
                placeholder="Description"
              />
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Photo URL</label>
              <input 
                type="text"
                value={editData.photo}
                onChange={(e) => setEditData({ ...editData, photo: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-xs"
                placeholder="Photo URL"
              />
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">CV URL</label>
               <input 
                type="text"
                value={editData.cvUrl}
                onChange={(e) => setEditData({ ...editData, cvUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-xs"
                placeholder="CV URL"
              />
              <button 
                onClick={handleSave}
                className="w-full py-3 bg-primary rounded-xl text-sm font-bold flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Check size={16} className="mr-2" /> SAVE PROFILE
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <a 
                href={data.about.cvUrl}
                target="_blank"
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                referrerPolicy="no-referrer"
              >
                <FileText size={14} className="mr-2" />
                DOWNLOAD CV
                <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Text Section */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="md:col-span-12 lg:col-span-7 flex flex-col justify-center order-2 lg:order-2"
        >
          <div className="pl-0 lg:pl-12 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-mono-label mb-0 uppercase tracking-[0.2em]">{data.about.role}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tighter mb-8">
              Halo Saya <span className="text-primary">{data.about.name}</span> {data.about.headline}
            </h2>
            <motion.p 
              className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data.about.description.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <div className="flex gap-4 flex-wrap">
              <div className="px-5 py-3 glass rounded-2xl flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                 <span className="text-xs font-bold uppercase tracking-widest opacity-60">Open for Opportunities</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
