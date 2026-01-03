
import React from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import GoalSettingScreen from './screens/GoalSettingScreen';
import PlanScreen from './screens/PlanScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import ProgressScreen from './screens/ProgressScreen';
import AIChatOverlay from './components/AIChatOverlay';

const PrototypeNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = [
    { path: "/", name: "Goals", icon: "track_changes" },
    { path: "/plan", name: "Plan", icon: "map" },
    { path: "/workout", name: "Workout", icon: "fitness_center" },
    { path: "/progress", name: "Progress", icon: "show_chart" }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md px-2 py-2 rounded-full border border-primary/30 flex gap-2 shadow-2xl">
      {screens.map(screen => (
        <button
          key={screen.path}
          onClick={() => navigate(screen.path)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${
            location.pathname === screen.path 
              ? "text-primary bg-primary/10" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-xl">{screen.icon}</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${location.pathname === screen.path ? 'block' : 'hidden md:block'}`}>
            {screen.name}
          </span>
        </button>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background-dark text-white selection:bg-primary/30 selection:text-white">
        <Routes>
          <Route path="/" element={<GoalSettingScreen />} />
          <Route path="/plan" element={<PlanScreen />} />
          <Route path="/workout" element={<WorkoutScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
        </Routes>
        <PrototypeNav />
        <AIChatOverlay />
      </div>
    </HashRouter>
  );
};

export default App;
