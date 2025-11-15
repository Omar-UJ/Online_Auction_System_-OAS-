import React from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"

function Services(){
        return(
            <div>
                <Nav/>
                <main className=" page service-page">
        <section className="w-services-back clean-block clean-services dark">
            <div className=" container">
            <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
              Our Services </h2>
            </div>
        </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img  alt=""  className="card-img-top w-100 d-block" src="img/display/car2.jpeg"/>
                            <div className="card-body">
                                <h4 className="card-title">Car For Sell</h4>
                                <p className="card-text">
                                Bid now for top-notch car services that will keep your vehicle in pristine condition.
                                 Our team of skilled technicians is dedicated to providing expert maintenance and repair services.
                                  From routine oil changes and tire rotations to comprehensive engine diagnostics and brake inspections, we've got you covered. Bid with confidence and ensure your car receives the best care it deserves.
                                 Don't wait, place your bid now and enjoy a smooth and worry-free driving experience!
                                </p>
                                </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img  alt="" className="card-img-top w-100 d-block" src="img/display/ho1.jpg"/>
                            <div className="card-body">
                                <h4 className="card-title">House For Sell</h4>
                                <p className="card-text">
                                Bid now for exceptional house services that will enhance the beauty and functionality of your home.
                                 Our team of experienced professionals is ready to handle a wide range of tasks, from interior and exterior painting to plumbing and electrical repairs. Whether you need a complete renovation or minor repairs, our attention to detail and commitment to quality will exceed your expectations. 
                                Place your bid now and transform your house into a haven of comfort and style!
                                
                                </p>
                            </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img  alt="" className="card-img-top w-100 d-block" src="img/display/pc.jpg"/>
                            <div className="card-body">
                                <h4 className="card-title">New Laptop Computers For Sell</h4>
                                <p className="card-text">
                                Bid now for reliable computer services that will keep your devices running smoothly.
                                 Our team of knowledgeable technicians is here to address all your tech needs, from hardware upgrades and software installations to virus removal and data recovery. We understand the importance of a functional and secure computer system, and we're committed to providing efficient solutions. Bid with confidence and ensure your computer receives expert care. 
                                Don't miss out on this opportunity to bid and enjoy hassle-free computing!
                                </p>
                            </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img alt=""  className="card-img-top w-100 d-block" src="img/display/art.jpg"/>
                            <div className="card-body">
                                <h4 className="card-title">Artwork Auction</h4>
                                <p className="card-text">Indulge your senses in the world of art with our exclusive collection of exquisite artwork.
                                 From captivating paintings to mesmerizing sculptures, each piece tells a unique story and evokes emotions. Bid now and elevate your space with a touch of sophistication and beauty. Whether you're an art connoisseur or an aspiring collector, this auction is your opportunity to own a piece of artistic brilliance.
                                 Place your bid and let the artistry enchant your surroundings!</p>
                            </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img alt=""  className="card-img-top w-100 d-block" src="img/display/ho2.jpg"/>
                            <div className="card-body">
                                <h4 className="card-title">House For Sell</h4>
                                <p className="card-text">
                                Bid now for reliable computer services that will keep your devices running smoothly.
                                 Our team of knowledgeable technicians is here to address all your tech needs, from hardware upgrades and software installations to virus removal and data recovery. We understand the importance of a functional and secure computer system, and we're committed to providing efficient solutions. Bid with confidence and ensure your computer receives expert care. 
                                Don't miss out on this opportunity to bid and enjoy hassle-free computing!
                                
                                    </p>
                            </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card"><img className="card-img-top w-100 d-block"  alt="" src="img/display/car 1.jpg"/>
                            <div className="card-body">
                                <h4 className="card-title">CarSell</h4>
                                <p className="card-text">

                                Bid now for top-notch car services that will keep your vehicle in pristine condition.
                                 Our team of skilled technicians is dedicated to providing expert maintenance and repair services.
                                  From routine oil changes and tire rotations to comprehensive engine diagnostics and brake inspections, we've got you covered. Bid with confidence and ensure your car receives the best care it deserves.
                                 Don't wait, place your bid now and enjoy a smooth and worry-free driving experience!
                                
                                </p>
                            </div>
                            <div><button className="btn btn-outline-primary btn-sm" type="button">Learn More</button></div>
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
export default Services;