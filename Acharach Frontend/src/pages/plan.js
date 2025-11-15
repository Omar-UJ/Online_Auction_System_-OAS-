import React,{useState} from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"
import Pay from "../Components/Pay"

function Plan(){

    const [fname, setFname]=useState('yarpopsmoke')
    const [lname, setLname]=useState('mike')
    const [email, setEmail]=useState('yaered123@gmail.com')
    const [amount, setAmount]=useState(0) 
    const [date , setDate]=useState(new Date())    

    const tx_ref = email.replace(/[^a-zA-Z0-9]/g, '') + date.getTime();
// The payment code
// Set fname lname email 
    

    const public_key = 'CHAPUBK_TEST-famFYsiTzliC5EYDBMA7eRbtxcXqvyTr'

    
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
                          <div className="clean-pricing-item">
                              <div className="heading">
                                  <h3>BASIC</h3>
                              </div>
                              <p>Basic Account Features.</p>
                              <div className="features">
                                  <h4><span className="feature">Full Support:&nbsp;</span><span>No</span></h4>
                                  <h4><span className="feature">Post Duration:&nbsp;</span><span>10 Days</span></h4>
                                  <h4><span className="feature">Limited Post:&nbsp;</span><span>2 Post p/Month</span></h4>
                              </div>
                              <div className="price">
                                  <h4>500 Birr</h4>
                              </div>
                              <Pay fname={fname} lname={lname} email={email} amount={500} tx_ref={tx_ref} public_key={public_key}/>
                          </div>
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
                              </div>
                              <Pay fname={fname} lname={lname} email={email} amount={1500} tx_ref={tx_ref} public_key={public_key}/>
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
                              </div>
                              <Pay fname={fname} lname={lname} email={email} amount={2500} tx_ref={tx_ref} public_key={public_key}/>
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

export default Plan;