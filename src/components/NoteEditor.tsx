// src/components/NoteEditor.tsx
import { useState } from "react";
import { Note } from "../types";
import { v4 as uuidv4 } from "uuid";

interface NoteEditorProps {
  onAdd: (note: Note) => void;
}

const NoteEditor = ({ onAdd }: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        createdAt: new Date().toISOString(),
        tags: [],
        updatedAt: ""
    };

    onAdd(newNote);
    setTitle("");
      setContent("");
      setTagsInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Titre de la note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Contenu de la note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tags (séparés par des virgules)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter la note
      </button>
    </form>
  );
};

export default NoteEditor;
