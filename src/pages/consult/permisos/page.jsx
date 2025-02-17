import { useEffect, useState } from "react"

import {DataTablePermisos} from "./TablaPermisos"


export default  function DemoPage() {
  
  return (
    <div className="container mx-auto py-10">
      <DataTablePermisos />
    </div>
  )
}
