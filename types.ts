
export interface UserGoal {
  focus: 'lose-weight' | 'build-muscle' | 'endurance';
  daysPerWeek: number;
  equipment: string[];
  restrictions: string[];
}

export interface WorkoutSet {
  id: string;
  weight: number;
  repsL: number;
  repsR: number;
  completed: boolean;
  prev?: string;
}

export interface Exercise {
  id: string;
  name: string;
  target: string;
  sets: WorkoutSet[];
  prevBest?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
