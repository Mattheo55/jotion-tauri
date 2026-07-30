import { SettingsInterface } from "@/interface/settingsInterface";
import { Input } from "../ui/input";
import SettingsInputLayout from "./SettingsInputLayout";
import SettingsPageLayout from "./SettingsPageLayout";

interface Props {
  settings: SettingsInterface;
  updateSettings: (category: keyof SettingsInterface, key: string, value: any) => void;
}

export default function GeneralSettingsSection({settings, updateSettings}: Props) {
  return (
    <SettingsPageLayout
      title="Générale"
      description="Paramètre général de Jotion"
    >
      <div className='flex flex-col gap-4'>
        <SettingsInputLayout title="Calendrier ICal" descritpion="URL du calendrier ICal">
          <Input className="w-70" value={settings.general.calendarUrl} onChange={(e) => updateSettings("general", "calendarUrl", e.target.value)}/>
        </SettingsInputLayout>
      </div>
    </SettingsPageLayout>
  )
}
