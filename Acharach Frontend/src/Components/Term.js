import React, { useEffect, useState } from "react"
 export default function Term(index){
   const view = ()=>{
    return(
        <div id="termOverlay" className="termOverlay" >
        <div id="termModal" className="termModal">
          <h2>Terms and Conditions</h2>
          <div class="scrollable">
          <p>Bid now for top-notch car services that will keep your vehicle in pristine condition.
              Our team of skilled technicians is dedicated to providing expert maintenance and repair services.
               From routine oil changes and tire rotations to comprehensive engine diagnostics and brake inspections, we've got you covered. Bid with confidence and ensure your car receives the best care it deserves.
              Don't wait, place your bid now and enjoy a smooth and worry-free driving experience!
          
              Bid now for top-notch car services that will keep your vehicle in pristine condition.
              Our team of skilled technicians is dedicated to providing expert maintenance and repair services.
               From routine oil changes and tire rotations to comprehensive engine diagnostics and brake inspections, we've got you covered. Bid with confidence and ensure your car receives the best care it deserves.
              Don't wait, place your bid now and enjoy a smooth and worry-free driving experience!
          </p>
          </div>
          <div class="buttunClassAlignRight">
              <button class="button-red" onClick={rejectTerms}>Reject</button>
              <button class="button-green" onClick={acceptTerms}>Accept  </button>
          </div>
        </div>
      </div>
     )
   }
     const  showTerms=()=>{
        view()
        document.getElementById("termOverlay").style.display = "block";
      }
      const  acceptTerms = ()=> {
        view()
        document.getElementById("termOverlay").style.display = "none";
        window.location = "/pay/bid"
      }
      const  rejectTerms = ()=> {
        view()
        // Perform action when terms are rejected
       // alert("You have rejected the terms and conditions.");
        document.getElementById("termOverlay").style.display = "none";
      }
 
        switch(index){
            case 1:
                showTerms()
                break
            case 2:
                acceptTerms()
                break
            case 3:
                rejectTerms()
                break
        }

       }           