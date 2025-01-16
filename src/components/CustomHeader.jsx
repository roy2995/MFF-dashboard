import { SidebarTrigger } from "@/components/ui/sidebar"
const CustomHeader = () => {
  return (
    
    <div className='grid grid-cols-12 bg-slate-300 gap-2 shadow-xl rounded-2xl h-10 items-center'>
        <div className="flex justify-start">
            <div className="">
            <SidebarTrigger />
            </div>
        </div>
        <div class="col-start-2 col-span-4 ">04</div>
        <div class=" ">04</div>
        <div class=" col-span-4 col-end-13">04</div>
        
    
    </div>
  )
}

export default CustomHeader