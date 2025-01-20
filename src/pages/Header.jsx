import { Calendar, Home, Inbox, Search, Settings ,BellRing} from "lucide-react"
import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const Header = () => {
  return (
    <>
    <div className="flex items-center gap-2 px-3 bg-slate-100 w-full">
            <div className='grid grid-cols-12 bg-black gap-2 rounded-2xl h-10 items-center'>
                    <SidebarTrigger  />
                    <Separator orientation="vertical" className="h-4" />
                    <div class="col-span-3 ml-4  ">
                        
                            <input type="search" name="" id=""/>
                
                    </div>
                    <Search size={24} color="blue" />
                    <div class="col-end-11 text-white "><Calendar size={24} color="#ffff" /></div>
                    <div class="col-end-12"><BellRing color="#ffff"/></div>
                    <div className="grid grid-cols-6 w-full">
                <div class="col-span-5 text-white">
                    <h1>MFF GESTION</h1>
                </div>
                <div class="items-end "><Settings  color="#ffff"  /></div>   
            </div>
            </div>
                    
                    
                

   </div>

   </>
  )
}

export default Header