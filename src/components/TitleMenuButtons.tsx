import { Minus, Square, X } from 'lucide-react'
import { getCurrentWindow } from '@tauri-apps/api/window';


export default function TitleMenuButtons() {
    const appWindow = getCurrentWindow();

    const handleClose = () => {
        appWindow.close();
    }

    const handleToggleWindow = () => {
        appWindow.toggleMaximize();
    }

    const handleMinimize = () => {
        appWindow.minimize();
    }

  return (
    <div className='flex gap-3'>
        <button className='cursor-pointer' onClick={handleMinimize}><Minus size={18}/></button>
        <button className='cursor-pointer' onClick={handleToggleWindow}><Square size={18}/></button>
        <button className='cursor-pointer' onClick={handleClose}><X size={18}/></button>
    </div>
  )
}
