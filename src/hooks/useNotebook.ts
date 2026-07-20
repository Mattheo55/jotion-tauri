import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/database";
import { NotebookInsert, notebookTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";

const NOTEBOOKS = "notebooks"

export const useNotebooks = () => {
    return useQuery({
        queryKey: [NOTEBOOKS],
        queryFn: () => db.select().from(notebookTable).orderBy(desc(notebookTable.id))
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