import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notebookTable = sqliteTable('notebook', {
    id: integer().primaryKey({autoIncrement: true}),
    name: text().notNull(),
})

export type Notebook = InferSelectModel<typeof notebookTable>;
export type NotebookInsert = InferInsertModel<typeof notebookTable>;