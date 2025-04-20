// src/components/NoteItem.tsx
import React, { useState } from "react";
import { Note } from "../types";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (updatedNote: Note) => void;
}

const NoteItem = ({ note, onDelete, onUpdate }: NoteItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTags, setEditedTags] = useState(note.tags.join(", "));

  const handleSave = () => {
    const updatedTags = editedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    onUpdate({
      ...note,
      title: editedTitle,
      content: editedContent,
      tags: updatedTags,
    });
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded mb-4 shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Tags (séparés par des virgules)"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Enregistrer
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
          <div className="mt-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Créée le {new Date(note.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </>
      )}
    </div>
  );
};

export default NoteItem;
