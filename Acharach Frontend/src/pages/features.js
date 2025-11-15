import React from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"

function Features(){
        return(  
<div>
   <Nav/>
    <main class="page">
    <section className="clean-block features">
            <div className="container">
                <div className="block-heading">
                    <p>By providing an online bidding platform, Acharach will make the  auction process more </p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 feature-box">
                        <i><img alt="" src={`/img/icon/checked_35px.png`} /> <h4>Efficient</h4></i>
                    </div>
                    <div className="col-md-5 feature-box">
                    <i><img  alt="" src={`/img/icon/checked_35px.png`} /> <h4>Convenient</h4></i>
                    </div>
                    <div className="col-md-5 feature-box">
                    <i><img alt=""  src={`/img/icon/checked_35px.png`} /> <h4>Responsive</h4></i>
                    </div>
                    <div className="col-md-5 feature-box">
                      <i><img alt=""  src={`/img/icon/checked_35px.png`} /> <h4>Accessible</h4></i>
</div>
                </div>
            </div>
        </section>
    </main>
    <Footer/>
</div>
        );
    }

export default Features;