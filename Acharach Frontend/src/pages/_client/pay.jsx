import React, { useState,useEffect } from "react";
import Header from "./c_header";
import Footer from "./c_footer";
import AuctionServices from "../../Services/auction-services";
import PayServices from "../../Services/pay-servies";
import Pay_Chapa from "../../Components/Pay"
const auctionServices = new AuctionServices;
const payServices = new PayServices;
const Pay = () => {

    const fname = sessionStorage.getItem("first_name");
    const lname = sessionStorage.getItem("last_name")
    const email= sessionStorage.getItem("email")
    const tx_ref = email.replace(/[^a-zA-Z0-9]/g, '') + new Date().getTime();
    const public_key = 'CHAPUBK_TEST-famFYsiTzliC5EYDBMA7eRbtxcXqvyTr'
    const[data,setData] = useState([]);
    const setBidPayment = ()=>{
        const info= {
            client_id:sessionStorage.getItem("client_id"),
            auction_id:sessionStorage.getItem("selected_item"),
            pay_amount:data.price
        }
        payServices.PayBidPayment(info).then((result)=>{
            if(result.data){ 
                sessionStorage.setItem("paid",true);
                window.location = "/cln/c-auction-detail"
            }else {
                sessionStorage.setItem("paid",false);
                window.location = "/cln/c-auction-detail"
            }
         }).catch((error)=>{
             alert(error);
         }); 
    }
   useEffect(()=>{
    const view= {
        id:sessionStorage.getItem("selected_item"),
        cID:sessionStorage.getItem("client_id")
    }
    auctionServices.GetSelectedAuction(view).then((result)=>{
        if(result.data!=null){ 
            setData(result.data); 
        }
     }).catch((error)=>{
         alert(error);
     }); 
   })
  return (
<div><Header/>
    <main class="page payment-page">
    <div className="container" style={{paddingtop: "100px"}}>
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <div className="row">
                <div className="ch-home-title">  
                  <div class="inner-banner ">
        <div class="container" style={{marginTop:"50px"}}>
        <div class="card-header py-3">
              <h1 class="text-primary m-0 font-weight-bold">Payment</h1>
                                        </div>
            </div>
                        </div>
        </div>
                <div className="col-lg-5 d-none d-lg-flex">
                  <img class="flex-grow-1 bg-register-image img-fluid d-block mx-auto"style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/img/bkg1.jpg)`}} src = {`data:image/jpg;base64,${data.pic}`}  />

                   </div>
                   <div className="col-lg-7">
                        <div className="p-5">
            <div class="clean-block payment-form dark container">
                <form>
                    <div class="products">
                        <h3 class="title">Checkout</h3>
                        <div class="item"><span class="price">Price to participate {data.price*0.02/100} Br</span>
                            <p class="item-name">{data.title}</p>
                            <p class="item-description">{data.desc}</p>
                        </div>
                    </div>
                    <div class="card-details">
                        <div class="form-row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                <Pay_Chapa fname={fname} lname={lname} email={email} amount={100} tx_ref={tx_ref} public_key={public_key}/>
                                <div class="form-group"><span class="btn btn-primary btn-block" type="submit" onClick={setBidPayment}>Proceed</span></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
                        </div>
                   </div>
                   </div>
                   </div>
                   </div>
   </div>
    </main>
<Footer/>
</div>
  );
};
export default Pay;