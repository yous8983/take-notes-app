import { Note } from '../types';

const STORAGE_KEY = 'notes';

export const loadNotes = (): Note[] | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
