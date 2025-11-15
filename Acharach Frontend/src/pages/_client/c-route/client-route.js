import React,{useEffect} from "react";
import {Routes,Route } from "react-router-dom"
import ClientHome from "../c_home"
import AddBid from "../c_add-bid"
import ClientAuctionList from "../c_auction-list";
import ClientAuctionDetail from "../c_auction-detail";
import ClientProfile from "../c_profile";
import ClientContactUs from "../c_contact-us";
import ClientPlan from "../c_plan";
import EditBid from "../c_edit-bid";
import MyBid from "../c_my-bid";
import PageNotFound from "../../page-not-found"
import Pay from "../pay"
import Notification from "../c_notification";

export default function ClientRoute(){
var s = sessionStorage.getItem("status")
if(s === "in")
{
  return ( 
      
        <Routes>
          <Route path="/cln/home" element={<ClientHome />} />
          <Route path="cln" index element={<ClientHome />} />
          <Route path="cln/add-bid" element={<AddBid />} />
          <Route path="/cln/edit-bid" element={<EditBid />} />
          <Route path="/cln/profile" element={<ClientProfile />} />
          <Route path="/cln/c-auction-list" element={<ClientAuctionList />} />
          <Route path="/cln/c-auction-detail" element={<ClientAuctionDetail />} />
          <Route path="/cln/c-conatct-us" element={<ClientContactUs />} />
          <Route path="/cln/c-upgrade" element={<ClientPlan />} />
          <Route path="/cln/c-my-bid" element={<MyBid />} />
          <Route path="/pay/bid" element={<Pay />} />
          <Route path="/cln/notf" element={<Notification />} />

          
       {/*    <Route path="*" element={<PageNotFound />} /> */}
         </Routes>

  )
}
}