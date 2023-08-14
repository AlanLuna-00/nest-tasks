/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { Provider } from "react-redux";
import store, { RootState, NotesState } from "@/redux/store";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "@/shared/axiosInstance";
import NoteContent from "@/components/Content";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setNotes } from "@/redux/notesSlice";
import { useSelector } from "react-redux";
import { Note } from "@/redux/notesSlice";
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const router = useRouter();

  const notes = useSelector((state: any) => state.notes.notes);
  console.log(notes);

  const user: User | null = JSON.parse(
    localStorage.getItem("userNotes") || "null"
  );

  if (!user) {
    router.push("auth/login");
    return (
      <div className="flex items-center justify-center h-screen">
        No user found
      </div>
    );
  }

  useEffect(() => {
    axiosInstance.get(`/notes/user/${user.id}`).then((response) => {
      dispatch(setNotes(response.data));
    });
  }, []);

  useEffect(() => {
    if (selectedNoteId) {
      axiosInstance.get(`/notes/${selectedNoteId}`).then((response) => {
        const note = response.data;
        setSelectedNote(note);
      });
    }
  }, [selectedNoteId]);

  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleNoteDelete = async (noteId: string) => {
    await axiosInstance.delete(`/notes/${noteId}`);
    const res = await axiosInstance.get(`/notes/user/${user?.id}`);
    dispatch(setNotes(res.data)); // Actualiza el estado de Redux con las notas después de eliminar una nota
  };

  const handleArchiveNote = async (noteId: string) => {
    const note = await axiosInstance.get(`/notes/${noteId}`);
    const archived = note.data.archived;
    await axiosInstance.put(`/notes/${noteId}`, {
      archived: !archived,
    });
    const res = await axiosInstance.get(`/notes/user/${user?.id}`);
    dispatch(setNotes(res.data)); // Actualiza el estado de Redux con las notas después de archivar una nota
  };
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <div className="flex min-h-screen bg-gray-900 text-white">
          <Sidebar
            notes={notes}
            selectedNoteId={selectedNoteId}
            onNoteSelect={handleNoteSelect}
            onNoteDelete={handleNoteDelete}
            onNoteArchive={handleArchiveNote}
          />
          <NoteContent note={selectedNote} />
        </div>
      </Provider>
    </div>
  );
}
