import { Category } from "./../components/Filter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
  categories: Category[];
}

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = notesSlice.actions;

export default notesSlice.reducer;
