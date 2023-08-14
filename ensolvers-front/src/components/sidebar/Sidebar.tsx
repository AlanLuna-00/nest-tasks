import React, { useState } from "react";
import AddNoteModal from "../AddNoteModal";
import Filter from "../Filter";
import { Note } from "@/redux/notesSlice";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onNoteDelete: (noteId: string) => void;
  onNoteArchive: (noteId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteDelete,
  onNoteArchive,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  console.log(notes);
  return (
    <aside className="flex flex-col bg-gray-800 w-1/4 p-4">
      <h2 className="text-xl font-semibold text-white mb-4">Notes App</h2>
      <Filter />
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        ADD
      </button>
      <ul className="space-y-2">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id} className="flex items-center">
              <span
                onClick={() => onNoteSelect(note.id)}
                className={`cursor-pointer ${
                  selectedNoteId === note.id ? "bg-gray-700" : ""
                } p-2 rounded flex-grow`}
              >
                {note.archived ? (
                  <span className="text-yellow-500">[ARCHIVED]</span>
                ) : (
                  <span className="text-white">{note.title}</span>
                )}
              </span>
              <button
                onClick={() => onNoteDelete(note.id)} // Add your logic for deleting a note here
                className="px-2 py-1 mx-2 text-red-500 hover:text-red-600"
              >
                DELETE
              </button>
              <button
                onClick={() => onNoteArchive(note.id)} // Add your logic for archiving a note here
                className="px-2 py-1 text-yellow-500 hover:text-yellow-600"
              >
                ARCHIVE
              </button>
            </li>
          ))
        ) : (
          <li className="text-white">No notes</li>
        )}
      </ul>
      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNote={() => {}}
      />
    </aside>
  );
};

export default Sidebar;
