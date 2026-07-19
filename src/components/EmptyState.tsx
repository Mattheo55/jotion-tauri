import { File } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-2'>
        <File color='#fff' size={60}/>
        <p className='text-2xl text-white'>Séléctionner une note</p>
        <p className='text-gray-500'>Choisir une note dans les panneaux à gauche de l'écran</p>
    </div>
  )
}
