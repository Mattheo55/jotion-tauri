import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Save, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import About from './settings/About'
import ButtonSidebar from './ButtonSidebar'

export default function SettingDialog() {
  return (
    <Dialog>
        <DialogTrigger className={"w-full"}>
            <ButtonSidebar icon={Settings}>Paramètre</ButtonSidebar>
        </DialogTrigger>
        <DialogContent className="sm:max-w-250">
            <DialogHeader>
                <DialogTitle className={"flex gap-4 items-center text-xl"}><Settings/> Paramètre</DialogTitle>
            </DialogHeader>

            <Tabs>
                <TabsList>
                    <TabsTrigger value={"general"}>Général</TabsTrigger>
                    <TabsTrigger value={"ia"}>IA</TabsTrigger>
                    <TabsTrigger value={"about"}>À propos</TabsTrigger>
                </TabsList>
                <TabsContent value={"general"} className={"mt-5"}>
                    <p className='flex items-center justify-center text-xl font-semibold'>Bientôt disponible</p>
                </TabsContent>
                <TabsContent value={'about'}><About/></TabsContent>
            </Tabs>

            <DialogFooter>
                <DialogClose><Button variant={"outline"}>Fermer</Button></DialogClose>
                <Button><Save/> Enregistrer</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
