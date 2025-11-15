import {  Routes,Route } from "react-router-dom"
import Welcome from "../welcome"
import React from "react";
import Services from "../services"
import AboutUs from "../about-us"
import Register from "../register"
import ContactUs from "../contact-us"
import Plan from "../plan"
import Features from "../features"
import AuctionList from "../auction-list"

export default function WelcomeRoute(){

  return (
         <Routes>
        
        <Route path="/" index element = {<Welcome/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/features" element={<Features />} />
        <Route path="/auction-list" element={<AuctionList />} />
      


         </Routes>

 
      
  )
}