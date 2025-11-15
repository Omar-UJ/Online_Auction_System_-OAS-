import React,{useState,useEffect} from "react"
import {useLocation} from "react-router-dom"
import Header from "../_admin/a_header"
import Footer from "../_admin/a_footer"
function HomePage(){
    useEffect(()=>{
    },[]);
   const goToAuction= ()=>{
       window.location = "adm/clients"
   }
   const goToAdd = ()=>{
       window.location = "/adm/auctions"
   }

       return(
           <>       
    <div>
       <Header />
                   <div className="row" style={{height:"1000px", padding: "90px" }}>
               <div className="ch-home-title"  >    <div class="inner-banner ">
<div class="container" style={{marginTop:"50px"}}>
            <h1 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
               Welcome back {sessionStorage.getItem("first_name")} </h1>
           </div>
          </div>
       </div>
                   <style jsx>{`
       .card-body {
         padding-left: 15px;
         padding-right: 15px;
         color: #b1c3f5;
       }
       .card-body:hover {
         color: #b179ff;
         padding: 18px;
       }
     `}</style>
                       <div className="col-md-6 col-xl-3 mb-4">
                           <div className="card shadow border-left-primary py-2">
                               <div className="card-body">
                                   <div className="row align-items-center no-gutters">
                                       <div className="col mr-2">
                                           <div className="text-uppercase text-primary font-weight-bold text-xs mb-1" onClick={() => goToAuction()} style={{ padding: "15px" }}><span>Manage Clients</span></div>
                                       </div>
                                       <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px'}}>
                                           <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                         
                                       </div>
                                  
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="col-md-6 col-xl-3 mb-4">
                           <div className="card shadow border-left-info py-2">
                               <div className="card-body">
                                   <div className="row align-items-center no-gutters">
                                       <div className="col mr-2" onClick={() => goToAdd()}>
                                           <div className="text-uppercase text-info font-weight-bold text-xs mb-1" style={{ padding: "15px" }}><span>Manage Auction</span></div>
                                       </div>
                                       <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i className="fa fa-legal fa-2x text-gray-300"></i></div>
                                   </div>
                               </div>
                           </div>
                       </div>

                   </div>
                   <Footer />
               </div></> 
       );
   }
export default HomePage;