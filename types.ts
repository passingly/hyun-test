
export interface Character {
  id: string;
  name: string;
  class: string;
  specialty: string;
  description: string;
  imageUrl?: string;
  stats: {
    power: number;
    intel: number;
    speed: number;
  };
  status: 'ACTIVE' | 'ENCRYPTED' | 'STANDBY';
}

export interface GenerationResult {
  id: string;
  type: 'text' | 'image';
  content: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}
