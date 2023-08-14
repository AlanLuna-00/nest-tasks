import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./userSlice";
import notesReducer from "./notesSlice";

const store = configureStore({
  reducer: {
    user: rootReducer,
    notes: notesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type NotesState = ReturnType<typeof notesReducer>;

export default store;
