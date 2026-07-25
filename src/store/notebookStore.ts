import { create } from "zustand";
import { Notebook } from "../db/schema";

interface NotebookStore {
    selectedNotebook: Notebook | null;
    setSelecedNotebook: (n: Notebook | null) => void;
}

export const useNotebookStore = create<NotebookStore>((set) => ({
    selectedNotebook: null,
    setSelecedNotebook: (n: Notebook | null) => set((state) => ({selectedNotebook: state.selectedNotebook = n}))
}))