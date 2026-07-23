import Calendar from './components/Calendar';
import Editor from './components/Editor';
import EmptyState from './components/EmptyState'
import NoteSidebar from './components/NoteSidebar'
import Sidebar from './components/Sidebar'
import { useNavigationStore } from './store/navigationStore';
import { useNoteStore } from './store/noteStore'

export default function App() {
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const viewMode = useNavigationStore((state) => state.viewMode);

  const render = () => {switch (viewMode) {
    case "calendar":
      return <Calendar/>
      break;
    default:
      return (
        <>
          <NoteSidebar/>
          <div className='bg-[#181818] h-full flex flex-col flex-1 border'>
            {selectedNote ? <Editor key={selectedNote.id} /> : <EmptyState/>}
          </div>
        </>
      );
      break;
  }}

  return (
    <main className='h-screen flex flex-row overflow-y-hidden'>
      <Sidebar/>
      <div className='flex flex-1'>
        {render()}
      </div>
    </main>
  )
}
