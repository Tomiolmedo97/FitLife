
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="sticky top-0 z-50 w-full border-b border-surface-accent bg-surface-darker/95 backdrop-blur px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            <h2 className="text-xl font-bold">FitLife AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-primary">My Plan</button>
            <button className="text-sm font-medium hover:text-primary transition-colors">Settings</button>
            <div className="size-10 rounded-full border-2 border-primary overflow-hidden">
               <img src="https://picsum.photos/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1024px] mx-auto w-full py-10 px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-black">Ready, Alex?<br/>Your AI Plan is Live.</h1>
            <p className="text-text-dim text-lg">Goal: <span className="text-white font-bold">Lose Weight</span> • Tool: <span className="text-white font-bold">Dumbbells</span></p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            <span className="text-primary text-xs font-bold uppercase">Personalized for you</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Duration', val: '45 min', icon: 'schedule' },
            { label: 'Intensity', val: 'Medium', icon: 'ecg_heart' },
            { label: 'Focus', val: 'Full Body', icon: 'accessibility_new' },
            { label: 'Confidence', val: '88%', icon: 'verified' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface-accent p-5 rounded-xl flex flex-col justify-between h-32">
              <div className="flex items-center gap-2 text-text-dim">
                <span className="material-symbols-outlined text-sm">{stat.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark rounded-2xl overflow-hidden flex flex-col md:flex-row border border-primary/10 group hover:border-primary/30 transition-all shadow-2xl">
          <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
            <img src="https://picsum.photos/600/800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Workout" />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded">WEEK 1 • MON</span>
                <span className="text-text-dim text-xs font-medium">Strength • 45 Min</span>
              </div>
              <h3 className="text-3xl font-black text-white">Full Body Ignition</h3>
              <p className="text-text-dim leading-relaxed">Kickstart your week with compound movements designed to spike your metabolism and build lean tissue.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/workout')}
                className="bg-primary hover:bg-primary-hover text-background-dark font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                Start Workout
              </button>
              <button className="bg-surface-accent hover:bg-surface-hover size-12 flex items-center justify-center rounded-lg transition-colors">
                <span className="material-symbols-outlined">bookmark</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold">Week 1 Roadmap</h3>
             <button className="text-sm font-medium text-primary">Edit Schedule</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className={`min-w-[140px] flex-1 p-4 rounded-xl border flex flex-col gap-3 transition-all ${idx === 0 ? 'bg-surface-accent border-primary/50 ring-1 ring-primary/20' : 'bg-surface-dark border-transparent'}`}>
                 <span className={`text-xs font-bold uppercase ${idx === 0 ? 'text-primary' : 'text-text-dim'}`}>{day}</span>
                 <p className={`text-sm font-bold ${idx === 0 ? 'text-white' : 'text-text-dim'}`}>
                   {idx === 0 ? 'Full Body Ignition' : idx === 3 ? 'Rest Day' : 'Strength Base'}
                 </p>
                 <span className="material-symbols-outlined text-text-dim text-lg">
                   {idx === 3 ? 'bedtime' : 'fitness_center'}
                 </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanScreen;
