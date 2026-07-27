import { db } from "@/db/database";
import { eq } from "drizzle-orm";
import { create } from "zustand";
import { Notebook, notebookTable } from "../db/schema";
import { useNavigationStore } from "./navigationStore";

interface NotebookStore {
    selectedNotebook: Notebook | null;
    setSelecedNotebook: (n: Notebook | null) => void;
    setSelecedNotebookById: (id: number) => void;
}

export const useNotebookStore = create<NotebookStore>((set) => ({
    selectedNotebook: null,
    setSelecedNotebook: (n: Notebook | null) => set((state) => ({selectedNotebook: state.selectedNotebook = n})),
    setSelecedNotebookById: async (id: number) => {
        useNavigationStore.getState().setSelectedMode('notebook');
        const [notebook] = await db.select().from(notebookTable).where(eq(notebookTable.id, id));
        set({selectedNotebook: notebook});
    },
}))