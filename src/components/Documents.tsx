import { FileText, Plus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Document, PortfolioData } from '../hooks/usePortfolioData';

interface DocumentsProps {
  data: PortfolioData;
  saveData: (data: PortfolioData) => void;
  isAdmin: boolean;
}

export default function Documents({ data, saveData, isAdmin }: DocumentsProps) {
  const [newMode, setNewMode] = useState(false);
  const [tempDoc, setTempDoc] = useState<Partial<Document>>({ name: '', url: '' });

  const handleAdd = () => {
    if (!tempDoc.name || !tempDoc.url) return;
    const item: Document = {
      id: Date.now().toString(),
      name: tempDoc.name,
      url: tempDoc.url
    };
    saveData({ ...data, documents: [...data.documents, item] });
    setNewMode(false);
    setTempDoc({ name: '', url: '' });
  };

  const handleDelete = (id: string) => {
    saveData({ ...data, documents: data.documents.filter(d => d.id !== id) });
  };

  return (
    <section id="documents" className="min-h-screen py-20 px-6 snap-start flex items-center justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
            <FileText size={18} />
          </div>
          <h3 className="section-title">Credentials & Files</h3>
        </motion.div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
            {data.documents.map((doc, index) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <a 
                  href={doc.url} 
                  target="_blank"
                  className="flex items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary transition-all duration-300 text-center"
                  referrerPolicy="no-referrer"
                >
                  {doc.name}
                </a>
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-400 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X size={10} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

          {isAdmin && (
            <button 
              onClick={() => setNewMode(true)}
              className="flex items-center justify-center p-4 border border-dashed border-white/20 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/40 transition-all mx-auto mt-8"
            >
              <Plus size={16} className="mr-2" /> ADD DOCUMENT
            </button>
          )}

        {newMode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass p-8 rounded-4xl max-w-md space-y-4"
          >
            <input 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none"
              placeholder="Document Name (e.g. CV)"
              value={tempDoc.name}
              onChange={e => setTempDoc({ ...tempDoc, name: e.target.value })}
            />
            <input 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none"
              placeholder="Link URL"
              value={tempDoc.url}
              onChange={e => setTempDoc({ ...tempDoc, url: e.target.value })}
            />
            <div className="flex gap-2">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                SAVE
              </button>
              <button 
                onClick={() => setNewMode(false)}
                className="px-6 bg-white/5 rounded-xl transition-colors hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
