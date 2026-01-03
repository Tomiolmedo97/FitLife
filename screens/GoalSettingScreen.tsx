
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoalSettingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(4);
  const [selectedGoal, setSelectedGoal] = useState('lose-weight');
  const [selectedEquipment, setSelectedEquipment] = useState(['Full Gym']);
  const [selectedRestrictions, setSelectedRestrictions] = useState(['Knee Injury']);

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="flex items-center justify-between px-6 lg:px-40 py-4 bg-background-dark/95 sticky top-0 z-50 border-b border-[#234833] backdrop-blur-sm">
        <div className="flex items-center gap-4 text-white">
          <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
          <h2 className="text-xl font-bold tracking-tight">FitLife</h2>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium hover:text-primary transition-colors">Help</button>
          <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold">Sign Up</button>
        </div>
      </header>

      <main className="flex-1 max-w-[960px] mx-auto w-full py-10 px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <p className="text-primary text-sm font-bold uppercase">Setup Progress</p>
              <p className="text-white/60 text-sm font-medium">Step 2 of 4</p>
            </div>
            <div className="rounded-full bg-[#326748] h-2 w-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: "50%" }}></div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-black leading-tight">What is your goal?</h1>
            <p className="text-text-dim text-lg">Personalized AI workout generation starts here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'lose-weight', icon: 'monitor_weight', title: 'Lose Weight', sub: 'Burn fat & HIIT' },
              { id: 'build-muscle', icon: 'fitness_center', title: 'Build Muscle', sub: 'Hypertrophy & Strength' },
              { id: 'endurance', icon: 'cardiology', title: 'Endurance', sub: 'Cardio & Stamina' },
            ].map(goal => (
              <div 
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`group p-6 rounded-xl bg-surface-dark border-2 cursor-pointer transition-all ${
                  selectedGoal === goal.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent hover:border-surface-accent'
                }`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center mb-4 ${selectedGoal === goal.id ? 'bg-primary/20 text-primary' : 'bg-surface-accent'}`}>
                  <span className="material-symbols-outlined">{goal.icon}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-1">{goal.title}</h3>
                <p className="text-text-dim text-sm">{goal.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <div className="flex justify-between items-end">
              <h2 className="text-white text-xl md:text-2xl font-bold">Weekly commitment?</h2>
              <span className="text-primary text-3xl font-black">{days} <span className="text-sm font-medium text-text-dim">days</span></span>
            </div>
            <input 
              type="range" min="1" max="7" value={days} 
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-accent rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">handyman</span>
                Equipment Access
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Full Gym', 'Dumbbells', 'Home Gym', 'None'].map(eq => (
                  <button 
                    key={eq}
                    onClick={() => toggleSelection(eq, selectedEquipment, setSelectedEquipment)}
                    className={`px-4 py-2 rounded-full font-bold text-sm border transition-all ${
                      selectedEquipment.includes(eq) 
                      ? 'bg-primary text-background-dark border-primary' 
                      : 'bg-surface-accent text-white border-transparent hover:border-primary/50'
                    }`}
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold">Restrictions / Injuries</h3>
              <div className="flex flex-wrap gap-3">
                {['No Jumping', 'Knee Injury', 'Back Pain', 'Shoulder Impingement'].map(re => (
                  <button 
                    key={re}
                    onClick={() => toggleSelection(re, selectedRestrictions, setSelectedRestrictions)}
                    className={`px-4 py-2 rounded-full font-bold text-sm border transition-all ${
                      selectedRestrictions.includes(re) 
                      ? 'bg-primary text-background-dark border-primary' 
                      : 'bg-surface-accent text-white border-transparent hover:border-primary/50'
                    }`}
                  >
                    {re}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background-dark/95 border-t border-[#234833] py-6 px-10 backdrop-blur-md z-40">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <button className="text-text-dim flex items-center gap-2 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back
          </button>
          <button 
            onClick={() => navigate('/plan')}
            className="bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 px-8 rounded-lg shadow-xl flex items-center gap-2"
          >
            Generate My Plan
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GoalSettingScreen;
