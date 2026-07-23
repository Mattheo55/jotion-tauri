import { SettingsInterface } from "@/interface/settingsInterface";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  settings: SettingsInterface;
  updateSettings: (category: keyof SettingsInterface, key: string, value: any) => void;
}

export default function GeneralSettingsSection({settings, updateSettings}: Props) {
  return (
    <div className='flex flex-col gap-4'>
        <FieldSet>
            <FieldLegend>Général</FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel>URL du calendrier ICAL</FieldLabel>
                    <Input value={settings.general.calendarUrl} onChange={(e) => updateSettings("general", "calendarUrl", e.target.value)}/>
                </Field>
            </FieldGroup>
        </FieldSet>
    </div>
  )
}
