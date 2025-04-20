import React from "react";

interface NoteCardProps {
  title: string;
  content: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content }) => (
  <div className="p-4 bg-white rounded shadow">
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="mt-2 text-gray-700">{content}</p>
  </div>
);

export default NoteCard;
