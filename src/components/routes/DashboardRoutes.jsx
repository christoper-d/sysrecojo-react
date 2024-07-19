import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainComponent from '../MainComponent'
import { EmpresasComponent } from '../EmpresasComponent'
import NothingSelectedView from '../NothingSelectedView'
import { RegistrosComponent } from '../RegistrosComponent'

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainComponent />}>
        <Route index element={<NothingSelectedView />} />
        <Route path="empresas" element={<EmpresasComponent />} />
        <Route path="registros" element={<RegistrosComponent />} />
        <Route path="*" element={<NothingSelectedView />} />
      </Route> 
    </Routes>
  )
}
