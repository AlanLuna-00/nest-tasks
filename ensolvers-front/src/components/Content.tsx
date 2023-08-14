"use client";
import React, { useEffect, useState } from "react";
import AddNoteModal from "./AddNoteModal";
import AddCategoriesModal from "./AddCategoryModal";
import { Category } from "./Filter";
import axiosInstance from "@/shared/axiosInstance";
import { Note } from "@/redux/notesSlice";
import { timeAgo } from "@/shared/timeAgo";

interface NoteContentProps {
  note: Note | null;
}

const NoteContent: React.FC<NoteContentProps> = ({ note }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  console.log(note);

  useEffect(() => {
    axiosInstance.get("/category").then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  if (!note) {
    return <div>No note selected</div>;
  }

  return (
    <main className="flex-grow p-4">
      {note ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{note.title}</h2>
          <p>{note.content}</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            EDIT
          </button>
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Categories
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">
              Created {timeAgo(note.createdAt)}
            </span>
            <span className="text-gray-400">
              Updated {timeAgo(note.updatedAt)}
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-gray-300">No note selected</p>
        </div>
      )}
      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNote={() => console.log("add note")}
        editNote={note}
      />
      <AddCategoriesModal
        isOpen={isAddCategoryModalOpen}
        note={note}
        categories={allCategories}
        selectedCategories={note?.categories || []}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategories={(categories) => {
          console.log("Selected categories:", categories);
        }}
      />
    </main>
  );
};

export default NoteContent;
