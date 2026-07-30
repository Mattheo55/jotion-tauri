import { Kbd, KbdGroup } from '../ui/kbd'
import SettingsInputLayout from './SettingsInputLayout'
import SettingsPageLayout from './SettingsPageLayout'

export default function Shortcut() {
  return (
    <SettingsPageLayout
        title='Raccourcis clavier'
        description='Naviguez et agissez plus vite dans Jotion.'
    >
        <div className='flex flex-col gap-4'>
            <SettingsInputLayout title='Ouvrir/Fermer menu des notes' boldTitle={false}>
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>S</Kbd>
                </KbdGroup>    
            </SettingsInputLayout>
            
            <SettingsInputLayout title='Ouvrir panneau de commande' boldTitle={false}>
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>/</Kbd>
                </KbdGroup>    
            </SettingsInputLayout>
        </div>
    </SettingsPageLayout>
  )
}
