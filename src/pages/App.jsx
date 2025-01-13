import '../css/App.css'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {Home} from "./Home"
import {EmployeProfile} from './employeProfile';
import {AddIncapacity} from "./forms/AddIncapacity";



function App() {
  
  return (
    <SidebarProvider>
      <Router>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b shadow-lg">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
           
          </div>
        </header>
      <Routes>
        
             <Route path="/home" element={<Home/>} />
             <Route path="/employe" element={<EmployeProfile/>} />
             <Route path="/addIncapacity" element={< AddIncapacity/>} />
        
             
      </Routes>
      </SidebarInset>
      </Router>
   
    </SidebarProvider>
  
  )
}

export default App
