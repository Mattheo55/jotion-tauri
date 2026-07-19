import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../db/database";
import { NotebookInsert, notebookTable } from "../db/schema";
import { desc } from "drizzle-orm";

export const useNotebooks = () => {
    return useQuery({
        queryKey: ['notebooks'],
        queryFn: () => db.select().from(notebookTable).orderBy(desc(notebookTable.id))
    })
} 

export const useCreateNotebook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (notebook: NotebookInsert) => {
            await db.insert(notebookTable).values(notebook)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['notebooks']})
    })
}