import { SettingsInterface } from "@/interface/settingsInterface";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  settings: SettingsInterface;
  updateSettings: (category: keyof SettingsInterface, key: string, value: any) => void;
}

export default function IaSettingsSection({settings, updateSettings}: Props) {
  return (
    <div className="flex flex-col gap-4">
        <FieldSet>
            <FieldLegend>IA</FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel>Clé API Gemini</FieldLabel>
                    <Input value={settings.api.apiKey} onChange={(e) => updateSettings('api', "apiKey", e.target.value)}/>
                    <FieldDescription>Obtenir votre clé api sur <span className="underline curosr-pointer">Gemini AI Studio</span></FieldDescription>
                </Field>
            </FieldGroup>
        </FieldSet>
    </div>
  )
}
