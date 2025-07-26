import type { Category } from "../enums/category";

export type Game = {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  developer: string;
  category: Category;
  isAvailable: boolean;

};
