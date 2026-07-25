import { create } from "zustand";
import { Note } from "../db/schema";

interface NoteStore {
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    selectedNote: null,
    setSelectedNote: (note: Note | null) => set({selectedNote: note})
}))