import { Category } from '../enums/Category';

export interface Game {
    id: number;
    title: string;
    genre: string;
    releaseYear: number;
    developer: string;
    category: Category;
    isAvailable: boolean;
    
}
