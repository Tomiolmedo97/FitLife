
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaAnalyzer from '../components/MediaAnalyzer';

const WorkoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 py-3 bg-surface-dark border-b border-[#234833] shadow-lg">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">ecg_heart</span>
          <h2 className="text-xl font-bold">Workout Session</h2>
          <div className="h-6 w-px bg-surface-accent mx-2 hidden md:block"></div>
          <span className="text-text-dim text-sm font-medium hidden md:block">Full Body Ignition</span>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-background-dark px-4 py-2 rounded-lg border border-primary/20">
            <span className="material-symbols-outlined text-primary text-lg mr-2">timer</span>
            <span className="font-mono font-bold">{formatTime(seconds)}</span>
          </div>
          <button 
            onClick={() => navigate('/progress')}
            className="bg-red-500/10 text-red-400 font-bold px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all text-sm"
          >
            Finish
          </button>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        <main className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2">
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">Hypertrophy</span>
                <span className="bg-surface-accent text-text-dim text-[10px] font-bold px-2 py-0.5 rounded uppercase">Compound</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-black">Bulgarian Split Squat</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-surface-accent/30 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">flag</span>
                <div>
                   <p className="text-text-dim text-[10px] font-bold uppercase">Goal</p>
                   <p className="font-medium text-white">3 Sets x 8-12 Reps</p>
                </div>
             </div>
             <div className="bg-surface-accent/30 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                <div>
                   <p className="text-text-dim text-[10px] font-bold uppercase">Best</p>
                   <p className="font-medium text-white">45 lbs x 10 Reps</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-12 px-4 text-xs font-bold uppercase text-text-dim mb-1">
               <div className="col-span-1">Set</div>
               <div className="col-span-3">Weight</div>
               <div className="col-span-4">Reps (L/R)</div>
               <div className="col-span-4 text-right">Action</div>
            </div>
            
            {[1, 2].map(n => (
              <div key={n} className="grid grid-cols-12 items-center bg-surface-dark/50 p-4 rounded-xl border border-transparent hover:border-surface-accent transition-all">
                <div className="col-span-1 font-bold text-white">{n}</div>
                <div className="col-span-3 text-white font-bold">45 <span className="text-xs text-text-dim font-normal">lbs</span></div>
                <div className="col-span-4 text-white">10 / 10</div>
                <div className="col-span-4 text-right">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
              </div>
            ))}

            <div className="bg-surface-dark p-6 rounded-2xl border-2 border-primary/30 shadow-2xl relative">
              <div className="absolute -top-3 left-6 bg-surface-dark border border-primary/30 px-3 py-0.5 rounded-full text-[10px] font-bold text-primary uppercase">Current Set 3</div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <label className="text-text-dim text-xs font-bold uppercase">Weight (lbs)</label>
                  <input type="number" defaultValue="45" className="bg-background-dark border-surface-accent rounded-lg text-2xl font-black p-4 focus:ring-1 focus:ring-primary w-full" />
                </div>
                <div className="md:col-span-4 flex gap-4">
                   <div className="flex-1 flex flex-col gap-2">
                      <label className="text-text-dim text-xs font-bold uppercase">L Reps</label>
                      <input type="number" placeholder="0" className="bg-background-dark border-surface-accent rounded-lg text-2xl font-black p-4 focus:ring-1 focus:ring-primary w-full" />
                   </div>
                   <div className="flex-1 flex flex-col gap-2">
                      <label className="text-text-dim text-xs font-bold uppercase">R Reps</label>
                      <input type="number" placeholder="0" className="bg-background-dark border-surface-accent rounded-lg text-2xl font-black p-4 focus:ring-1 focus:ring-primary w-full" />
                   </div>
                </div>
                <div className="md:col-span-4">
                  <button className="w-full bg-primary hover:bg-primary-hover text-background-dark font-black py-5 rounded-xl uppercase shadow-lg shadow-primary/20 transition-all active:scale-95">Complete Set</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <MediaAnalyzer />
          </div>
        </main>

        <aside className="lg:w-80 flex flex-col gap-6">
           <div className="bg-surface-dark p-6 rounded-2xl border border-primary/10 flex flex-col items-center gap-2 shadow-lg">
             <p className="text-text-dim text-xs font-bold uppercase">Rest Timer</p>
             <div className="text-5xl font-mono font-bold text-white">01:30</div>
             <div className="flex gap-2 w-full mt-2">
               <button className="flex-1 bg-surface-accent py-2 rounded text-xs font-bold">Skip</button>
               <button className="flex-1 bg-primary text-background-dark py-2 rounded text-xs font-bold">+15s</button>
             </div>
           </div>

           <div className="flex flex-col gap-3">
             <h3 className="text-text-dim text-xs font-bold uppercase px-2">Up Next</h3>
             {[
               { name: 'Overhead Press', sets: '3 Sets x 12 Reps' },
               { name: 'Pull Ups', sets: 'Max Reps x 3' },
             ].map((ex, i) => (
               <div key={i} className="bg-surface-dark/40 p-4 rounded-xl flex items-center gap-4 border border-transparent hover:border-surface-accent cursor-pointer group">
                  <div className="size-10 bg-background-dark rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-dim group-hover:text-primary transition-colors">fitness_center</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{ex.name}</p>
                    <p className="text-xs text-text-dim">{ex.sets}</p>
                  </div>
               </div>
             ))}
           </div>
        </aside>
      </div>
    </div>
  );
};

export default WorkoutScreen;
