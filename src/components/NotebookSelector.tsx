import { useNotebooks } from "@/hooks/useNotebook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

interface NotebookSelectorProps {
    selected: number | null,
    setSelected: (n: number | null) => void;
}

export default function NotebookSelector({selected, setSelected}: NotebookSelectorProps) {
    const {data: notebooks = []} = useNotebooks();

  return (
    <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger>
            <SelectValue placeholder={"Sélectionner un carnet"}/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Carnet</SelectLabel>
                {
                    notebooks.map((n) => (
                        <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}
