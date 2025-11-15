import React,{useState} from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"
function AboutUs(){
        return(
<div>
<Nav/>
<main className="page">
<section className="clean-block about-us">
     <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Welcome to Acharach</h2>
            </div>
        </div>
            <div className="container">
                
                <div className="block-heading">
               </div>
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-lg-4">
                        <div className="card text-center clean-card"><img className="card-img-top w-100 d-block" src="img/icon/gallery_128px.png"/>
                            <div className="card-body info">
                                <h4 className="card-title">Umer Jemal</h4>
                                <p className="card-text">Developer.</p>
                                <div className="icons"><a href="#"><i className="icon-social-facebook"></i></a><a href="#"><i className="icon-social-instagram"></i></a><a href="#"><i className="icon-social-twitter"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="card text-center clean-card"><img className="card-img-top w-100 d-block" src="img/icon/gallery_128px.png"/>
                            <div className="card-body info">
                                <h4 className="card-title">Yared Downturn</h4>
                                <p className="card-text">Developer.</p>
                                <div className="icons"><a href="#"><i className="icon-social-facebook"></i></a><a href="#"><i className="icon-social-instagram"></i></a><a href="#"><i className="icon-social-twitter"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="card text-center clean-card"><img className="card-img-top w-100 d-block" src="img/icon/gallery_128px.png"/>
                            <div className="card-body info">
                                <h4 className="card-title">Liuel Sanders</h4>
                                <p className="card-text">Developer.</p>
                                <div className="icons"><a href="#"><i className="icon-social-facebook"></i></a><a href="#"><i className="icon-social-instagram"></i></a><a href="#"><i className="icon-social-twitter"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="card text-center clean-card"><img className="card-img-top w-100 d-block" src="img/icon/gallery_128px.png"/>
                            <div className="card-body info">
                                <h4 className="card-title">Liuel Sanders</h4>
                                <p className="card-text">Developer.</p>
                                <div className="icons"><a href="#"><i className="icon-social-facebook"></i></a><a href="#"><i className="icon-social-instagram"></i></a><a href="#"><i className="icon-social-twitter"></i></a></div>
                            </div>
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

export default AboutUs;