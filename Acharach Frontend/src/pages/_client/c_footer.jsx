import React,{useState} from "react"
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function Footer(){
        return(
            <React.Fragment>
      {
      <div>
     <footer className="page-footer dark"  >
         <div className="container">
             <div className="row">
                 <div className="col-sm-3">
                     <h5>Get started</h5>
                     <ul>
                         <li><a href="/">Home</a></li>
                         <li><a href="/register">Sign up</a></li>
                         <li><a href="#">Downloads</a></li>
                     </ul>
                 </div>
                 <div className="col-sm-3">
                     <h5>About us</h5>
                     <ul>
                         <li><a href="#">Company Information</a></li>
                         <li><a href="/contact-us">Contact us</a></li>
                         <li><a href="#">Reviews</a></li>
                     </ul>
                 </div>
                 <div className="col-sm-3">
                     <h5>Support</h5>
                     <ul>
                         <li><a href="#">FAQ</a></li>
                         <li><a href="#">Help desk</a></li>
                         <li><a href="#">Forums</a></li>
                     </ul>
                 </div>
                 <div className="col-sm-3">
                     <h5>Legal</h5>
                     <ul>
                         <li><a href="#">Terms of Service</a></li>
                         <li><a href="#">Terms of Use</a></li>
                         <li><a href="#">Privacy Policy</a></li>
                     </ul>
                 </div>
                 <div className="col-sm-3">
                     <h5>Follow Us</h5>
                     <div className="socila-links">
                    
                    <a href="#"><i className="fab fa-facebook-f"></i> </a>
                     <a href="#"><i className="fab fa-twitter"></i> </a> 
                    <a href="#"><i className="fab fa-instagram"></i> </a> 
                     <a href="#"><i className="fab fa-linkedin-in"></i> </a> 
                     <style jsx>{`

.socila-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    font-size: 25px;
    
    margin:0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50px;
    color: #ffffff;
    transition: all 0.5s ease;
}
.socila-links a:hover{
    color: #fffff;
    background-color: #b16fff;
     transform: rotate(360deg);
}
     `}</style>

                
            </div>
                 </div>
             </div>
         </div>
         <div className="footer-copyright">
             <p>© 2023 Copyright</p>
         </div>
     </footer>
     
 </div>}
   </React.Fragment> 
        );
    }

export default Footer;