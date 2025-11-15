import React from "react";
import {Routes,Route } from "react-router-dom"
import AdminDashboard from "../a_home"
import AdminClients from "../a_clients"
import AdminAuctions from "../a_auctions";
export default function AdminRouter(){
  return ( 
        <Routes>
          <Route  path="/adm" exact element={<AdminDashboard />} />
           <Route  path="/adm" exact element={<AdminDashboard />} />
                <Route path="/adm/clients"  element={<AdminClients />} />
                <Route path="/adm/auctions"  element={<AdminAuctions />} />

         </Routes>
  )
}