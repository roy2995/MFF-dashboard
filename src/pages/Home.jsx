import React from 'react'
import {Chart1} from "./charts/Chart1"

export const Home = () => {
  return (
    <>
     <div className="flex flex-1 flex-col text-center gap-4 p-4 pt-0 mt-6">
      <div className='bg-slate-200 rounded-lg gap-4 mb-4'>
          <h1 className='text-lg font-bold'>Graficas Especiales de Administración</h1>
      </div>
      

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" >
              <h1>Grafica de incidentes</h1>
                <Chart1/>
              </div>

              <div className="aspect-video rounded-xl bg-muted/50" >
              <h1>Grafica de incidentes</h1>
                <Chart1/>
              </div>

              <div className="aspect-video rounded-xl bg-muted/50" >
              <h1>Número de empleados</h1>
              <h2>9</h2>

              </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" >
                <Chart1/>
              </div>
          </div>
     
      </div>
    </>
    
  )
}
