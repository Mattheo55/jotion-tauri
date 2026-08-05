import { useNoteService } from "@/service/NoteService";
import { Button } from "../ui/button";
import SettingsInputLayout from "./SettingsInputLayout";
import SettingsPageLayout from "./SettingsPageLayout";

export default function ExportImportSettingsSection() {
    const {importMarkdown} = useNoteService();
  return (
    <SettingsPageLayout
        title="Import / Export"
        description="Importer et exporter des notes dans Jotion"
    >
        <SettingsInputLayout 
            title="Importer au format markdown"
            descritpion="Importer une note au format markdown"
        >
            <Button variant={"secondary"} onClick={importMarkdown}>Importer</Button>
        </SettingsInputLayout>
    </SettingsPageLayout>
  )
}
