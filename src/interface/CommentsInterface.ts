import { UUID } from 'crypto';

export interface Comment {
    id: UUID; 
    username: string; 
    content: string; 
    score: number; 
    created_at: string; 
  }
  