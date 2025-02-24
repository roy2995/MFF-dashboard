import { useEffect, useState } from "react"
import {useApiGateway} from '../../../lib/useApiGateway';
import { getAllPermisos } from "../../../lib/api_gateway";
import {DataTablePermisos} from "./TablaPermisos"


export default  function DemoPagePermisos({isAdmin , userData} ) {

  const [allPermisos, setAllPermisos] = useState([])

  let path = ""
       
 
         // Función reutilizable para cargar los datos
         const fetchData = async () => {
           console.log("Console log para userData fetchdata"+userData)
           if (userData && userData.name) {
             if(isAdmin){
               path = `api/v1/permiso/`
             }else{
               path = `api/v1/permiso/username/${userData.name}`
             };
 
             try {
               const estadosUser = await getAllPermisos(path);
               console.log("Estados actualizados: ", estadosUser);
               setAllPermisos(estadosUser);
             } catch (error) {
               console.error("Error fetching estadosUser:", error);
             }
           }
         };

         useEffect(() => {
          // Llama a la función async
          fetchData();
        }, [userData]);

  return (
    <div className="container mx-auto py-10">
      <DataTablePermisos userData={allPermisos} isAdmin={isAdmin}/>
    </div>
  )
}
