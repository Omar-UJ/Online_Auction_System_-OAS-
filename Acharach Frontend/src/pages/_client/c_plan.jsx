import React,{useState} from "react"
import Nav from "./c_header"
import Footer from"./c_footer"
import PayServices from "../../Services/pay-servies"
const payServices = new PayServices
function ClientPlan(){
    const setProPayment = ()=>{
        const info= {
            email:sessionStorage.getItem("email"),
            amount:400,
            tx_ref:"test-pro-payment"
            
        }
        payServices.PayProPayment(info).then((result)=>{
                sessionStorage.setItem("account_status",501)
                window.location = "/cln"

         }).catch((error)=>{
             alert(error);
         }); 
    }
    const setPremiumPayment = ()=>{
        const info= {
            email:sessionStorage.getItem("email"),
            amount:1500,
            tx_ref:"test-premium-payment"
            
        }
        payServices.PayProPayment(info).then((result)=>{
                sessionStorage.setItem("account_status",601)
                window.location = "/cln"

         }).catch((error)=>{
             alert(error);
         }); 
    }
        return(
       
      <div> <Nav/>
      <main className="page pricing-table-page">
          <section className="clean-block clean-pricing dark">
              <div className="container">
                  <div className="block-heading">
                      <h2 className="text-info">Account Type</h2>
                  </div>
                  <div className="row justify-content-center">
                      <div className="col-md-5 col-lg-4">
                      </div>
                      <div className="col-md-5 col-lg-4">
                          <div className="clean-pricing-item">
                              <div className="ribbon"><span>Best Value</span></div>
                              <div className="heading">
                                  <h3>PRO</h3>
                              </div>
                              <p>Pro Account Features.</p>
                              <div className="features">
                                  <h4><span className="feature">Full Support:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Post Duration:&nbsp;</span><span>60 Days</span></h4>
                                  <h4><span className="feature">Limited Post:&nbsp;</span><span>10 Post p/Month</span></h4>
                              </div>
                              <div className="price">
                                  <h4>1550 Birr</h4>
                              </div><button className="btn btn-primary btn-block" type="button"onClick={setProPayment}>BUY NOW</button>
                          </div>
                      </div>
                      <div className="col-md-5 col-lg-4">
                          <div className="clean-pricing-item">
                              <div className="heading">
                                  <h3>PREMIUM</h3>
                                  
                              </div>
                              <p>Premium Account Features.</p>
                              <div className="features">
                                  <h4><span className="feature">Full Support:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Post Duration:&nbsp;</span><span>120 Days</span></h4>
                                  <h4><span className="feature">Limited Post:&nbsp;</span><span>20 Post p/Month</span></h4>
                              </div>
                              <div className="price">
                                  <h4>2500 Birr</h4>
                              </div><button className="btn btn-outline-primary btn-block" type="button" onClick={setPremiumPayment}>BUY NOW</button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </main>
      <Footer/>
  </div>
      
  
        );
    }

export default ClientPlan;