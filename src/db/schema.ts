import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notebookTable = sqliteTable('notebook', {
    id: integer().primaryKey({autoIncrement: true}),
    name: text().notNull(),
})

export type Notebook = InferSelectModel<typeof notebookTable>;
export type NotebookInsert = InferInsertModel<typeof notebookTable>;

export const noteTable = sqliteTable('note', {
    id: integer().primaryKey({autoIncrement: true}),
    name: text().notNull(),
    content: text().notNull(),
    notebook_id: integer().references(() => notebookTable.id).notNull(),
    archive: integer({mode: 'boolean'}).default(false).notNull(),
    trash: integer({mode: 'boolean'}).default(false).notNull(),

    created_at: integer({mode: "timestamp"}).notNull().$defaultFn(() => new Date()),
    updated_at: integer({mode: "timestamp"}).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
})

export type Note = InferSelectModel<typeof noteTable>;
export type NoteInsert = InferInsertModel<typeof noteTable>;