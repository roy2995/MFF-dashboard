import { useEffect, useState } from "react"
import { getAllVacations } from "../../../lib/api_gateway";
import {DataTableVacaciones} from "./TablaVacaciones"


export default  function DemoPageVacaciones({isAdmin, userData}) {

  
  const [allVacations, setAllVacations] = useState([])
  
  let path = ""
      

        // Función reutilizable para cargar los datos
        const fetchData = async () => {
          console.log("Console log para userData fetchdata"+userData)
          if (userData && userData.name) {
            if(isAdmin){
              path = `api/v1/vacaciones/`
            }else{
              path = `api/v1/vacaciones/username/${userData.name}`
            };

            try {
              const estadosUser = await getAllVacations(path);
              console.log("Estados actualizados: ", estadosUser);
              setAllVacations(estadosUser);
            } catch (error) {
              console.error("Error fetching estadosUser:", error);
            }
          }
        };

  useEffect(() => {
     console.log("AdminContext");
 
     // Llama a la función async
     fetchData();
   }, [userData]);
  
  
  
  
 
  return (
    <div className="container mx-auto py-10">
      <DataTableVacaciones vacationsData={allVacations} isAdmin={isAdmin}/>
    </div>
  )
}
