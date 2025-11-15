import React,{useEffect} from "react"
import Header from "./c_header"
import Footer from "./c_footer"

function ClientHome(){

    useEffect(()=>{
    
     },[]);
    const goToMyBid = ()=>{
        window.location = "cln/c-my-bid"
    }
    const goToProfile = ()=>{
        window.location = "cln/profile"
    }
    const goToAuction= ()=>{
        window.location = "cln/c-auction-list"
    }
    const goToAdd = ()=>{
        window.location = "cln/add-bid"
    }
    const goToNotf = ()=>{
        window.location = "cln/notf"
    }
        return(
            <>       
     <div>
        <Header />
                    <div className="row" style={{height:"1000px", padding: "90px" }}>
                <div className="ch-home-title"  >    <div class="inner-banner ">
<div class="container" style={{marginTop:"50px"}}>
             <h1 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Welcome back {sessionStorage.getItem("first_name")} Account status {sessionStorage.getItem("account_status")}</h1>
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
                                            <div className="text-uppercase text-primary font-weight-bold text-xs mb-1" onClick={() => goToMyBid()} style={{ padding: "15px" }}><span>My Bids</span></div>
                                        </div>
                                        <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                          
                                        </div>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-success py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-success font-weight-bold text-xs mb-1" onClick={() => goToAuction()} style={{ padding: "15px" }}><span>Auction List</span></div>
                                        </div>
                                        <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                      
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
                                            <div className="text-uppercase text-info font-weight-bold text-xs mb-1" style={{ padding: "15px" }}><span>Place Your Bid</span></div>
                                        </div>
                                        <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i className="fa fa-legal fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-warning py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-warning font-weight-bold text-xs mb-1" style={{ padding: "15px" }} onClick={() => goToProfile()}><span>Profile</span></div>
                                        </div>
                                        <div className="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i className="fas fa-user-circle fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-md-6 col-xl-3 mb-4">
                                    <div class="card shadow border-left-primary py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col mr-2">
                                                    <div class="text-uppercase text-primary font-weight-bold text-xs mb-1" style={{ padding: "15px" }}><span>Earnings (monthly)</span></div>
                                                    <div class="text-dark font-weight-bold h5 mb-0" style={{ paddingLeft: '15px', paddingRight: '15px' }}><span>ETB 40,000</span></div>
                                                </div>
                                                <div class="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i class="fas fa-calendar fa-2x text-gray-300"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3 mb-4">
                                    <div class="card shadow border-left-success py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col mr-2">
                                                    <div class="text-uppercase text-success font-weight-bold text-xs mb-1" style={{ padding: "15px" }}><span>Earnings (annual)</span></div>
                                                    <div class="text-dark font-weight-bold h5 mb-0" style={{ paddingLeft: '15px', paddingRight: '15px' }}><span>ETB 215,000</span></div>
                                                </div>
                                                <div class="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i class="fas fa-dollar-sign fa-2x text-gray-300"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3 mb-4">
                                    <div class="card shadow border-left-info py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col mr-2">
                                                    <div class="text-uppercase text-info font-weight-bold text-xs mb-1" style={{ padding: "15px" }}> <span>Account Setup</span></div>
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col-auto">
                                                            <div class="text-dark font-weight-bold h5 mb-0" style={{ paddingLeft: '20px', paddingRight: '15px' }}>50%<span></span></div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="progress progress-sm">
                                                                <div class="progress-bar bg-info" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}><span class="sr-only">50%</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i class="fas fa-address-card fa-2x text-gray-300"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xl-3 mb-4">
                                    <div class="card shadow border-left-warning py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col mr-2">
                                                    <div class="text-uppercase text-warning font-weight-bold text-xs mb-1"  onClick={() => goToNotf()} style={{ padding: "15px" }}><span>Notifications</span></div>
                                                    <div class="text-dark font-weight-bold h5 mb-0" style={{ paddingLeft: '15px', paddingRight: '15px' }}><span></span></div>
                                                </div>
                                                <div class="col-auto" style={{ paddingLeft: '15px', paddingRight: '15px' }}><i class="fas fa-spinner fa-2x text-gray-300"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                    <Footer />
                </div></> 
        );
    }

export default ClientHome;