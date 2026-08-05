import ImportNoteModal from "@/components/ImportNoteModal";
import { toast } from "@/components/ui/toast";
import { useCreateNote } from "@/hooks/useNote";
import { ImportFile } from "@/type/ImportFile";
import { useCreateBlockNote } from "@blocknote/react";
import NiceModal from "@ebay/nice-modal-react";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from '@tauri-apps/plugin-fs';

export const useNoteService = () => {
  const {mutate: createNote} = useCreateNote();
  const editor = useCreateBlockNote();

  const importMarkdown = async () => {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [{
        name: "Markdown",
        extensions: ['md']
      }]
    });

    if (!file) return;

    const filePath = file as string; 
    const defaultName = filePath.split(/[/\\]/).pop()?.replace('.md', '') || null;

    const fileContent = await readTextFile(filePath);
    const block = await editor.tryParseMarkdownToBlocks(fileContent);

    const settings = (await NiceModal.show(ImportNoteModal, {name: defaultName})) as ImportFile | null;

    if(!settings) {
        toast.add({type: "error", title: "Une erreur c'est produit pendant l'import"});
        return;
    }

    createNote({
      name: settings.name,
      notebook_id: settings.notebookId,
      content: JSON.stringify(block),
    });

    toast.add({type: "success", title: "Note importer"})
  };

  return { importMarkdown };
};