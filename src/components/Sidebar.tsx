import { FolderPlus, Plus } from "lucide-react";
import Colors from "tailwindcss/colors"

export default function Sidebar() {
  return (
    <div className='bg-[#181818] w-70' data-tauri-drag-region>
        <div className='p-5'><p className='text-white font-bold text-3xl'>Jotion</p></div>

        <div className="p-5">
            <button className="text-white bg-[#242424] w-full justify-center rounded flex gap-2 py-2 font-bold cursor-pointer"><Plus color="#fff"/> Nouveau carnet</button>
        </div>

        <div className="p-5">
            <div className="flex justify-between">
                <p className="text-gray-500 font-bold">Carnet</p>
                <button className="cursor-pointer"><FolderPlus color={Colors.gray[500]} /></button>
            </div>
        </div>
    </div>
  )
}
