import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Save, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'

export default function SettingDialog() {
  return (
    <Dialog>
        <DialogTrigger>
            <p className='text-gray-400 flex items-center gap-2 cursor-pointer'><Settings/> Paramètre</p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-250">
            <DialogHeader>
                <DialogTitle className={"flex gap-4 items-center text-xl"}><Settings/> Paramètre</DialogTitle>
            </DialogHeader>

            <Tabs className={"h-50"}>
                <TabsList>
                    <TabsTrigger value={"general"}>Général</TabsTrigger>
                    <TabsTrigger value={"ia"}>IA</TabsTrigger>
                </TabsList>
                <TabsContent value={"general"}>
                    <p className='flex items-center justify-center text-xl font-bold'>Bientôt disponible</p>
                </TabsContent>
            </Tabs>

            <DialogFooter>
                <DialogClose><Button variant={"outline"}>Fermer</Button></DialogClose>
                <Button><Save/> Enregistrer</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
