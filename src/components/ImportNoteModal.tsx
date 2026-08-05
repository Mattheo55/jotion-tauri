import { ImportFile } from '@/type/ImportFile';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useEffect, useState } from 'react';
import NotebookSelector from './NotebookSelector';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

interface ImportNoteModalProps {
    name: string | null
}

const ImportNoteModal = NiceModal.create(({name}: ImportNoteModalProps) => {
    const [noteName, setNoteName] = useState<string>("");
    const [notebookId, setNotebookId] = useState<number | null>(null);
    const modal = useModal();

    useEffect(() => {
        if(name) setNoteName(name);
    }, []);

    const handleConfirm = () => {
        if(noteName.trim().length === 0 || !notebookId) return;

        modal.resolve({
            name: noteName,
            notebookId
        } satisfies ImportFile);
        modal.remove();
    }

    return (
        <Dialog open={modal.visible} onOpenChange={(open) => {if(!open) modal.hide()}}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Importé une note</DialogTitle>
                </DialogHeader>

                <FieldGroup>
                    <Field>
                        <FieldLabel>Nom de la note</FieldLabel>
                        <Input value={noteName} onChange={(e) => setNoteName(e.target.value)} />
                    </Field>

                    <Field>
                        <FieldLabel>Carnet</FieldLabel>
                        <NotebookSelector selected={notebookId} setSelected={setNotebookId}/>
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <Button onClick={handleConfirm}>Importer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
})

export default ImportNoteModal;