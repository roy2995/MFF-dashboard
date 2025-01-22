import { Calendar, Home, Inbox, Search, Settings ,BellRing} from "lucide-react"
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
const Header = ({notificationCount=10}) => {

  const location = useLocation();
  // The pathname is available in location.pathname
  const pathname = location.pathname;
  const pathSegments = pathname.split('/')
  const thisPage = pathSegments[pathSegments.length-1]
  return (
    <>
    <div className="flex items-center justify-between px-3 bg-slate-100 w-full h-16">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <p className="text-lg font-bold">{thisPage}</p>
      </div>
      <div className="flex items-center gap-4">
        <Calendar size={24} className="text-black" />
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger>
            <div className="relative"> 
              <BellRing size={24} className="text-black" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {notificationCount}
                </span>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <NotificationHover />   
          </HoverCardContent>
        </HoverCard>
        <Separator orientation="vertical" className="h-4" />
        
        <Settings size={24} className="text-black" />
      </div>
    </div>

   </>
  )
}

export default Header