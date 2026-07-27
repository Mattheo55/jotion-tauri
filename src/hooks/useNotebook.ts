import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { count, desc, eq } from "drizzle-orm";
import { db } from "../db/database";
import { NotebookInsert, notebookTable, noteTable } from "../db/schema";

const NOTEBOOKS = "notebooks"

export const useNotebooks = () => {
    return useQuery({
        queryKey: [NOTEBOOKS],
        queryFn: () => db.select().from(notebookTable).orderBy(desc(notebookTable.id))
    })
} 

export const useNotebookById = (id?: number) => {
    return useQuery({
        queryKey: [NOTEBOOKS, id],
        queryFn: async () => {
            if(!id) return;
            const [notebook] = await db.select().from(notebookTable).where(eq(notebookTable.id, id));
            return notebook;
        },
        enabled: !!id
    })
}

export const useNotebookNoteCount = (id: number) => {
    return useQuery({
        queryKey: [NOTEBOOKS, id, 'noteCount'],
        queryFn: async () => {
            const result = await db.select({count: count()}).from(noteTable).where(eq(noteTable.notebook_id, id));
            return result[0]?.count ?? 0;
        }
    })
}

export const useCreateNotebook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (notebook: NotebookInsert) => {
            await db.insert(notebookTable).values(notebook)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTEBOOKS]})
    })
}

export const useUpdateNotebook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id, ...updateNotebook}: {id: number} & Partial<NotebookInsert>) => await db.update(notebookTable).set(updateNotebook).where(eq(notebookTable.id, id)),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTEBOOKS]})
    })
}

export const useDeleteNotebook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await db.delete(notebookTable).where(eq(notebookTable.id, id)),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [NOTEBOOKS]})
    })
}