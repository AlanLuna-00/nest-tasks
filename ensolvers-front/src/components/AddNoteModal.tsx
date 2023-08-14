"use client";
import { useEffect, useState } from "react";
import { User } from "@/app/page";
import { Note } from "@/redux/notesSlice";
import axiosInstance from "@/shared/axiosInstance";
import "../app/globals.css";
import { setNotes } from "@/redux/notesSlice";
import { useDispatch } from "react-redux";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (newNote: Note) => void;
  editNote?: Note;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  editNote,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleAddNote = async () => {
    const user: User | null = JSON.parse(
      localStorage.getItem("userNotes") || "null"
    );

    console.log(user!.id, title, content);

    if (editNote) {
      const res = await axiosInstance.put(`/notes/${editNote.id}`, {
        title,
        content,
      });
      console.log(res.data);
    } else {
      const res = await axiosInstance.post(`notes/${user!.id}`, {
        title,
        content,
      });
      console.log(res.data);
    }

    const loadNote = await axiosInstance.get(`/notes/user/${user!.id}`);
    dispatch(setNotes(loadNote.data));

    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white p-8 rounded-md shadow-lg w-96 text-black">
        <h2 className="text-xl font-semibold mb-4 text-black	">Add New Note</h2>
        <label className="block mb-2 font-semibold text-black	">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2 font-semibold">Content:</label>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
