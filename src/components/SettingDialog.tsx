import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Save, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import About from './settings/About'
import ButtonSidebar from './ButtonSidebar'
import GeneralSettingsSection from './settings/GeneralSettingsSection'
import { useEffect, useState } from 'react'
import { SettingsInterface } from '@/interface/settingsInterface'
import { getSettings, saveSettings } from '@/service/SettingsService'
import IaSettingsSection from './settings/IaSettingsSection'

export default function SettingDialog() {
    const [settings, setSettings] = useState<SettingsInterface | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getSettings().then(setSettings);
    }, []);

    const handleUpdate = (category: keyof SettingsInterface, key: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                [key]: value
            }
        });
    };

    const handleSave = async () => {
        if (!settings) return;
        setIsSaving(true);
        await saveSettings(settings);
        setIsSaving(false);
    };

  return (
    <Dialog>
        <DialogTrigger className={"w-full"}>
            <ButtonSidebar icon={Settings}>Paramètre</ButtonSidebar>
        </DialogTrigger>
        <DialogContent className="md:max-w-250">
            <DialogHeader>
                <DialogTitle className={"flex gap-4 items-center text-xl"}><Settings/> Paramètre</DialogTitle>
            </DialogHeader>

            {settings ? <Tabs>
                    <TabsList>
                        <TabsTrigger value={"general"}>Général</TabsTrigger>
                        <TabsTrigger value={"ia"}>IA</TabsTrigger>
                        <TabsTrigger value={"about"}>À propos</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"general"} className={"mt-5"}><GeneralSettingsSection settings={settings} updateSettings={handleUpdate}/></TabsContent>
                    <TabsContent value={"ia"}><IaSettingsSection settings={settings} updateSettings={handleUpdate}/></TabsContent>
                    <TabsContent value={'about'}><About/></TabsContent>
                </Tabs>
            : <p>Chargement des paramètre ...</p>
            }

            <DialogFooter>
                <DialogClose render={<Button variant={"outline"}>Fermer</Button>}/>
                <Button onClick={handleSave} disabled={isSaving}><Save/> Enregistrer</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
