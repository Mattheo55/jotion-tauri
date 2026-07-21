import Editor from './components/Editor';
import EmptyState from './components/EmptyState'
import NoteSidebar from './components/NoteSidebar'
import Sidebar from './components/Sidebar'
import { useNoteStore } from './store/noteStore'

export default function App() {
  const selectedNote = useNoteStore((state) => state.selectedNote);

  return (
    <main className='h-screen flex flex-row overflow-y-hidden'>
      <Sidebar/>
      <NoteSidebar/>
      <div className='bg-[#181818] h-full flex flex-col flex-1'>
        {selectedNote ? <Editor/> : <EmptyState/>}
      </div>
    </main>
  )
}
