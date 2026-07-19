import EmptyState from './components/EmptyState'
import NoteSidebar from './components/NoteSidebar'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <main className='h-screen flex flex-row'>
      <Sidebar/>
      <NoteSidebar/>
      <div className='bg-[#181818] flex-1'>
        <EmptyState/>
      </div>
    </main>
  )
}
