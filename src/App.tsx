import React, { useState, useEffect } from "react";
import "./App.css";
import { Note } from "./types";
import { loadNotes, saveNotes } from "./utils/storage";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const storedNotes = loadNotes();
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const handleAdd = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleUpdate = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => note.tags.includes(tag));
    return matchesSearch && matchesTags;
    
  });

  return (
    <div className="container mx-auto p-4">
      <NoteEditor onAdd={handleAdd} />
      <input
        type="text"
        placeholder="Rechercher une note..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="mb-4">
        {allTags.map((tag) => (
          // <button
          //   key={tag}
          //   onClick={() => handleTagClick(tag)}
          //   className={`mr-2 mb-2 px-3 py-1 rounded ${
          //     selectedTags.includes(tag)
          //       ? "bg-blue-500 text-white"
          //       : "bg-gray-200 text-gray-700"
          //   }`}
          // >
          //   {tag}
          // </button>
          <button
  key={tag}
  onClick={() => handleTagClick(tag)}
  className={`mr-2 mb-2 px-3 py-1 rounded ${
    selectedTags.includes(tag)
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-gray-700"
  }`}
>
  {tag}
</button>

        ))}
      </div>
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
