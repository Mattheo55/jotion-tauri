import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/database";
import { NoteInsert, noteTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export const NOTES = 'NOTES'

export const useNotes = () => {
    return useQuery({
        queryKey: [NOTES],
        queryFn: () => db.select().from(noteTable),
    })
}

export const useNotesByNotebook = (notebookId: number) => {
    return useQuery({
        queryKey: [NOTES, notebookId],
        queryFn: () => db.select().from(noteTable).where(eq(noteTable.notebook_id, notebookId)).orderBy(desc(noteTable.created_at)),
    })
}

export const useCreateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note: NoteInsert) => await db.insert(noteTable).values(note),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTES]})
    })
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id, ...updateNote}: {id: number} & Partial<NoteInsert>) => await db.update(noteTable).set(updateNote).where(eq(noteTable.id, id)),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTES]})
    })
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await db.delete(noteTable).where(eq(noteTable.id, id)),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTES]})
    })
}