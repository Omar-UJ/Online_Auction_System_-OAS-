import React from "react";
import { useState } from "react";


function Pay({fname,lname,email,amount,tx_ref,public_key}){
  const [myReturn, setMyReturn] = useState('');
  const [myAmount, setMyAmount] = useState();
   
    const handleReturnUrlChange = (event) => {
      sessionStorage.setItem('tx_ref',tx_ref);
      sessionStorage.setItem('amount',amount);
    };
  
    return(
        <div>
    <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value={public_key} />
    <input type="hidden" name="tx_ref" value={tx_ref} />
    <input type="hidden" name="amount" value={amount} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value={fname} />
    <input type="hidden" name="last_name" value={lname} />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
    {/* returning the  */}
    <input
  type="hidden"
  name="return_url"
  value={`http://localhost:3000/about-us`   
}
onChange={handleReturnUrlChange}

/>
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit" className="btn btn-outline-primary btn-block">Proceed</button>
  </form>
    </div>
  );
}

export default Pay;