/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Lock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useState } from 'react';
import Documents from './components/Documents';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { StarsBackground } from './components/StarsBackground';
import { useFirestorePortfolioData } from './hooks/useFirestorePortfolioData';
import { verifyAdminPassword } from './services/adminService';

export default function App() {
  const { data, saveData, isLoaded } = useFirestorePortfolioData();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  if (!isLoaded) return null;

  const handleToggleAdmin = (targetVal: boolean) => {
    if (targetVal) {
      setShowLogin(true);
      setLoginError('');
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) {
        setIsAdmin(true);
        setShowLogin(false);
        setPassword('');
      } else {
        setLoginError('Password salah!');
        setPassword('');
      }
    } catch (error) {
      setLoginError('Error saat verifikasi password');
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory font-sans selection:bg-white/20 scroll-smooth">
      <StarsBackground />
      <Navbar isAdmin={isAdmin} setIsAdmin={handleToggleAdmin} />
      
      <main>
        <Hero data={data} saveData={saveData} isAdmin={isAdmin} />
        <Education data={data} saveData={saveData} isAdmin={isAdmin} />
        <Skills data={data} saveData={saveData} isAdmin={isAdmin} />
        <Projects data={data} saveData={saveData} isAdmin={isAdmin} />
        <Experience data={data} saveData={saveData} isAdmin={isAdmin} />
        <Documents data={data} saveData={saveData} isAdmin={isAdmin} />
      </main>

      <Footer data={data} saveData={saveData} isAdmin={isAdmin} />

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-8 rounded-3xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white/40">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Admin Login</h2>
              <p className="text-white/40 text-sm mb-6">Enter password to enable CRUD features.</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full glass p-4 rounded-2xl outline-none focus:border-white/40 text-center"
                  autoFocus
                  disabled={loginLoading}
                />
                {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
                <div className="flex gap-2">
                   <button type="submit" disabled={loginLoading} className="flex-1 bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                    <Check size={18} /> {loginLoading ? 'Loading...' : 'Login'}
                  </button>
                  <button type="button" onClick={() => setShowLogin(false)} disabled={loginLoading} className="px-6 glass rounded-2xl text-white/40 disabled:opacity-50">X</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Indicator */}
      {isAdmin && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-6 right-6 z-60 glass px-4 py-2 rounded-full border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Edit Mode Active
        </motion.div>
      )}
    </div>
  );
}
