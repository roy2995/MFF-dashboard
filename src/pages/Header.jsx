import { Calendar, Settings ,BellRing} from "lucide-react"
import { useLocation } from "react-router-dom"

import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import NotificationHover from "@/components/NotificationHover"
const Header = ({notificationCount=1}) => {

  const location = useLocation();
  // The pathname is available in location.pathname
  const pathname = location.pathname;
  const pathSegments = pathname.split('/')
  const thisPage = pathSegments[pathSegments.length-2]
  return (
    <>
    <div className="flex items-center justify-between px-3 bg-slate-100 w-full h-16">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <p className="text-lg font-bold"></p>
      </div>
      <div className="flex items-center gap-4">
        {/* <Calendar size={24} className="text-black" /> */}
       
        {/*<Separator orientation="vertical" className="h-4" />*/}
        
        {/* <Settings size={24} className="text-black" /> */}
      </div>
    </div>

   </>
  )
}

export default Header