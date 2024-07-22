import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardRoutes } from '../components/routes/DashboardRoutes'

export const AppRouter = () => {
  return (
    // <Routes basename={process.env.PUBLIC_URL}>
    <Routes >
        <>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </>
    </Routes>
  )
}
