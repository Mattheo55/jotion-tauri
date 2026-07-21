import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

interface ConfirmOptions {
    title: string;
    description: string;
}

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export default function ConfirmerProvider({children}: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<(value: boolean) => void>()

    const confirm = (option: ConfirmOptions) => {
        setOptions(option);
        setIsOpen(true);
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve)
        })
    }

    const handleConfirm = () => {
        resolver?.(true);
        setIsOpen(false);
    }

    const handleCancel = () => {
        resolver?.(false);
        setIsOpen(false);
    }

  return (
    <ConfirmContext.Provider value={confirm}>
        {children}
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent size="sm">
            <AlertDialogHeader>
                <AlertDialogMedia>
                    <Trash color="red" size={60}/>
                </AlertDialogMedia>
                <AlertDialogTitle>{options?.title}</AlertDialogTitle>
                <AlertDialogDescription>{options?.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Confirmer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}