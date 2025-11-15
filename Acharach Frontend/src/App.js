import { BrowserRouter } from "react-router-dom"
import React from "react"
import AdminRoute from "./pages/_admin/a_route/admin-route"
import WelcomeRoute from "./pages/Route/route"
import ClientRoute from "./pages/_client/c-route/client-route"
export default function App(){
  return (
      <React.Fragment>
         {
         <BrowserRouter>
         <WelcomeRoute/>
         <ClientRoute/>
         <AdminRoute/>
         </BrowserRouter>}
      </React.Fragment>
      
  )
}