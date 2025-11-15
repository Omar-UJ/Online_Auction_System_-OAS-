import React from "react"
 export default function Owner(d){
   //this function return owner page
   const handleEdit= ()=>{
    window.location = "/cln/edit-bid"
 }  
    return(
        <div> 
        <div className="price">
                    <h3> {d.price} Birr</h3>
                </div>
                <button className="btn btn-primary"  onClick={()=>handleEdit()} type="button"><i >
                    </i>&nbsp;Edit</button>
        </div>
    );
}    