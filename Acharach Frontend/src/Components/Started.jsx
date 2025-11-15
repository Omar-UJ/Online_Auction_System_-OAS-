import React from "react" 
//this function return started bid page 
 export default function Started(data,updatePriceSuccess,livePrice,auctionServices,price,_paid,setUpdatePriceSuccess,closed){
 
  const UpdateLive = (view)=>{
    auctionServices.getLivePrice(view).then((result)=>{
        livePrice =  result.data;
      }).catch((error)=>{
          alert(error);
      }); 

}
  
    //price setter
    const  priceSave = (e)=>{
      price = e;
}
  //place client price on bid
     const handleBid= (event)=>{
        
      if(!_paid)showTerms()
      else{
          if(livePrice>price && price<data.price)
             setUpdatePriceSuccess(false)
      else {
      const view= {
          id:sessionStorage.getItem("selected_item"),
          cID:sessionStorage.getItem("client_id")
      }
      const data= {
          auction_id:sessionStorage.getItem("selected_item"),
          email:sessionStorage.getItem("email"),
          price:price
      }
      auctionServices.SetBid(data).then((result)=>{
   if(result.data=="Success"){
      if(data.type==0)
      UpdateLive(view);
      setUpdatePriceSuccess(true)
   }else 
   
   setUpdatePriceSuccess(false)
  }).catch((error)=>{
           alert(error);
       });
     }
      }
      if(closed){
          event.target.disabled = true;
      }
  }
  const open = ()=>{
    if(data.type==="Open Bid")
    return(
        <div>
        Current bid Br:  {livePrice} <br/>
        </div>
    )
} 
  const popup = ()=>{
    if(updatePriceSuccess){
         return (
            <div className="popup">
            <p className="message">Success!</p>
          </div>
    ); 
    }else if(!updatePriceSuccess){
        <div>
            <div className="popup">
            <p className="message">Check Your Price!</p>
          </div>
      </div>
    }
    else{
        return (
      <div>
              <p className="message">Not Success!</p>
                
      </div>
    ); 
    } 
}
const showTerms = ()=> {
  document.getElementById("termOverlay").style.display = "block";
}
  function hideTerms() {
    document.getElementById("termOverlay").style.display = "none";
  }
  const  acceptTerms = ()=> {
    document.getElementById("termOverlay").style.display = "none";
    window.location = "/pay/bid"
  }
  const  rejectTerms = ()=> {
    // Perform action when terms are rejected
   // alert("You have rejected the terms and conditions.");
    document.getElementById("termOverlay").style.display = "none";
  }
    return(
        <>
<style jsx>{`
popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: green;
    color: white;
    padding: 20px;
    text-align: center;
  }

  .message {
    animation-name: move;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  
@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
}
`}</style>
        <div>
        <div className="price">   
        <div>
        <form class="auction_form cart" method="post" enctype="multipart/form-data" data-product_id="1121">	
</form>
        </div>

         Bid Br: {data.price}  <br/>
        {open()}
        {popup()}

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
        <input id="bid-btn"  type="number" onChange={(e)=>priceSave(e.target.value)}/>
        </div>
        <button className="btn btn-primary" id="bid-btn" onClick={(e)=>handleBid(e)} type="button"><i className="icon-basket">
            </i>&nbsp;Bid</button>
</div>
</>
    );
}        