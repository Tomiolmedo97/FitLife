
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-24">
      <aside className="hidden md:flex w-64 flex-col border-r border-[#234833] bg-background-dark p-6 gap-8">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border-2 border-primary bg-cover" style={{backgroundImage: 'url("https://picsum.photos/100")'}}></div>
          <div>
            <h1 className="text-sm font-bold">FitLife Pro</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Active Member</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2">
           {[
             { name: 'Dashboard', icon: 'dashboard', path: '/' },
             { name: 'Plan', icon: 'map', path: '/plan' },
             { name: 'Workouts', icon: 'fitness_center', path: '/workout' },
             { name: 'Progress', icon: 'show_chart', path: '/progress', active: true },
             { name: 'Settings', icon: 'settings', path: '#' },
           ].map(item => (
             <button 
               key={item.name}
               onClick={() => item.path !== '#' && navigate(item.path)}
               className={`flex items-center gap-3 p-3 rounded-lg transition-all ${item.active ? 'bg-primary/10 text-primary' : 'text-text-dim hover:bg-surface-accent hover:text-white'}`}
             >
               <span className="material-symbols-outlined text-xl">{item.icon}</span>
               <span className="text-sm font-bold">{item.name}</span>
             </button>
           ))}
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:text-red-300 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:px-20 bg-background-dark">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white">Squat Progress</h2>
              <p className="text-text-dim text-lg">Tracking volume load and strength metrics</p>
            </div>
            <button className="bg-primary hover:bg-primary-hover text-background-dark font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/10 transition-all active:scale-95">
              <span className="material-symbols-outlined">add</span>
              Log Session
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            <button className="shrink-0 px-5 py-2 rounded-lg bg-primary text-background-dark font-bold text-sm">Squat</button>
            {['Bench Press', 'Deadlift', 'Shoulder Press', 'Pull Ups'].map(ex => (
              <button key={ex} className="shrink-0 px-5 py-2 rounded-lg bg-surface-dark text-text-dim font-bold text-sm hover:bg-surface-accent hover:text-white transition-colors border border-transparent">
                {ex}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Estimated 1RM', val: '315 lbs', trend: '+5%', icon: 'fitness_center', color: 'text-primary' },
              { label: 'Total Volume (30d)', val: '12.4k lbs', trend: '+12%', icon: 'calendar_month', color: 'text-blue-400' },
              { label: 'Personal Best', val: '335 lbs', trend: null, icon: 'emoji_events', color: 'text-yellow-500' },
            ].map(card => (
              <div key={card.label} className="bg-surface-dark p-6 rounded-2xl border border-primary/10 flex flex-col justify-between h-40 group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start">
                   <p className="text-text-dim text-xs font-bold uppercase tracking-wider">{card.label}</p>
                   <span className={`material-symbols-outlined ${card.color} group-hover:scale-110 transition-transform`}>{card.icon}</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-3xl font-black text-white">{card.val}</h3>
                   {card.trend && <span className="text-primary text-[10px] font-bold bg-primary/10 px-2 py-0.5 rounded-full">{card.trend}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-dark p-8 rounded-2xl border border-primary/10 flex flex-col gap-8 shadow-xl">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Strength Evolution</h3>
                <div className="flex bg-background-dark p-1 rounded-lg">
                   {['1W', '1M', '3M', 'All'].map((t, i) => (
                     <button key={t} className={`px-4 py-1.5 text-[10px] font-bold rounded-md ${i === 1 ? 'bg-primary text-background-dark' : 'text-text-dim'}`}>{t}</button>
                   ))}
                </div>
             </div>
             
             {/* Mock Chart Area */}
             <div className="relative h-64 w-full flex items-end gap-3 px-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                   {[1,2,3,4,5].map(n => <div key={n} className="w-full h-px bg-primary"></div>)}
                </div>
                {[30, 45, 40, 60, 55, 75, 70, 90].map((h, i) => (
                  <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                     <div 
                       className={`w-full rounded-t-sm transition-all cursor-pointer ${i === 7 ? 'bg-primary shadow-[0_0_15px_rgba(19,236,109,0.5)]' : 'bg-surface-accent hover:bg-primary/50'}`}
                       style={{ height: `${h}%` }}
                     >
                       {i === 7 && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-background-dark text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap shadow-xl animate-bounce">
                           315 lbs
                         </div>
                       )}
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <div>
                   <p className="text-white text-sm font-bold">Insights from Gemini Coach</p>
                   <p className="text-text-dim text-xs leading-relaxed mt-1">Your volume is up 12% this month! You're hitting a fatigue threshold on set 4—consider increasing rest time by 30s to break through the 315lb ceiling.</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-4 mb-20">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Recent History</h3>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="bg-surface-dark rounded-2xl overflow-hidden border border-primary/10">
               <table className="w-full text-left text-sm">
                  <thead className="bg-background-dark text-text-dim font-bold border-b border-primary/10">
                     <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Session</th>
                        <th className="px-6 py-4">1RM (Est)</th>
                        <th className="px-6 py-4 text-right">Volume</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                     {[
                       { d: 'Today, Feb 24', n: 'Squat Power', r: '315 lbs', v: '12,450 lbs' },
                       { d: 'Feb 20, 2024', n: 'Leg Hypertrophy', r: '305 lbs', v: '11,200 lbs' },
                       { d: 'Feb 16, 2024', n: 'Squat Strength', r: '305 lbs', v: '10,800 lbs' },
                     ].map((row, i) => (
                       <tr key={i} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 text-white font-medium">{row.d}</td>
                          <td className="px-6 py-4 text-text-dim">{row.n}</td>
                          <td className="px-6 py-4 text-white font-bold">{row.r}</td>
                          <td className="px-6 py-4 text-right font-mono text-primary">{row.v}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressScreen;
