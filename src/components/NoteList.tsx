// src/components/NoteList.tsx
import React from "react";
import { Note } from "../types";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (updatedNote: Note) => void;
}

const NoteList = ({ notes, onDelete, onUpdate }: NoteListProps) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default NoteList;
