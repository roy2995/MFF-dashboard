import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './pages/App.jsx'
import { AdminProvider } from '../src/contexto/AdminContext';

import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <SidebarProvider>
      <App />
      </SidebarProvider>
    </AdminProvider>   
  </StrictMode>,
)
