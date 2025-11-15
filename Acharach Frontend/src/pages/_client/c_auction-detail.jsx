import React,{useState,useEffect} from "react"
import Nav from "../_client/c_header"
import Footer from"../_client/c_footer"
import AuctionServices from "../../Services/auction-services";
import Rate from "../rate";
import PayServices from "../../Services/pay-servies";
import NotStarted from "../../Components/NotStart";
import Started from "../../Components/Started";
import Owner from "../../Components/Owner";
const auctionServices = new AuctionServices;
const payServices = new PayServices;
function ClientAuctionDetail(){
    const[data,setData] = useState([]);
    const[winner,setWinner] = useState([]);
    const[price,setPrice] = useState('');
    const[livePrice,setLivePrice] = useState('');
    const [_paid,setPaid] = useState();
    const [updatePriceSuccess,setUpdatePriceSuccess] = useState();
    const [closePrice,setClosePrice] = useState(null);
    const [closed,setClosed] = useState(false);

   //this function return owner page

  // Popup code
  useEffect(() => {
    let timeout;
    if (updatePriceSuccess) {
      timeout = setTimeout(() => {
        setUpdatePriceSuccess(false);
      }, 3000);
    }
    
    return () => clearTimeout(timeout);
  }, [updatePriceSuccess]);



   //Check payment before setting a bid
   const chkPayment = ()=>{
    const user = {
        type:sessionStorage.getItem("selected_item"),
        email:sessionStorage.getItem("client_id")
    }
    payServices.ChkBidPayment(user).then((result)=>{
        if(result.data || sessionStorage.getItem("selected_item")==data.id && sessionStorage.getItem("paid"))setPaid(true);
        return setPaid(false);
    })
   }
    const handleRate = (e)=>{
        alert(sessionStorage.getItem("selected_item"))
        const data= {
            id:sessionStorage.getItem("selected_item"),
            cID:sessionStorage.getItem("client_id"),
            rate:e
        }
        auctionServices.IncRate(data).then((result)=>{
            alert(result.data)
         }).catch((error)=>{
             alert(error);
         });
    }

    useEffect(()=>{
        const view= {
             id:sessionStorage.getItem("selected_item"),
             cID:sessionStorage.getItem("client_id")
         }
         auctionServices.GetSelectedAuction(view).then((result)=>{
             if(result.data!=null){ 
                 setData(result.data);
                 UpdateLive(view); 
                  auctionServices.IncView(view).then((result)=>{  
                 }).catch((error)=>{
                     alert(error);
                 }); 
             }
          }).catch((error)=>{
              alert(error);
          }); 
          if(data.type ==="Closed Bid" && closePrice===null){
            setClosed(true)
            const close_price ={
            id:data.id,
            cID:sessionStorage.getItem("email")
            }
            auctionServices.getClosedPrice(close_price).then((result)=>{
            setClosePrice(result.data)
            alert(closePrice)
            if(closePrice!=null){
                document.getElementById("bid_btn").disabled = true;
            }
               setUpdatePriceSuccess(true)
           }).catch((error)=>{
                    alert(error);
                });
          }
         if(!sessionStorage.getItem("paid"))chkPayment();
         else setPaid(sessionStorage.getItem("paid"))

         if(data.type=="Open Bid"){
            const interval = setInterval(() => {
            UpdateLive(view);
           }, 2000); // Update every 10 seconds
       
           // Cleanup the interval when the component unmounts

           return () => clearInterval(interval);
         }
         
         }, []);

        //update the live price 
    const UpdateLive = (view)=>{
        auctionServices.getLivePrice(view).then((result)=>{
            setLivePrice(result.data);
          }).catch((error)=>{
              alert(error);
          }); 

    }
 const role = ()=>{
    if(sessionStorage.getItem("client_id")===""+data.cID)return Owner(data);
    else if(data.isStart===1 )return Started(data,updatePriceSuccess,livePrice,auctionServices,price,_paid,setUpdatePriceSuccess,closed);
    else NotStarted(data);
 }
 if(data.sDate !== "Start" && data.eDate !== "End" && data.type === "Open Bid" ){
    const chk  = {
        id:data.id
    }
auctionServices.GetOpenWinner(chk).then((result)=>{
    setWinner(result.data);
  }).catch((error)=>{
      alert(error);
  }); 
  if(sessionStorage.getItem("email")===winner.email){
    return(
        <div>

Congrat!

        </div>
    )
  }
 }
        return(
            <div>
                
                <Nav/>
                <section className="clean-block clean-product dark">
                        <div className=" container" style={{marginTop:"70px"}}>
                            
                            <div className="block-content">
                                <div className="product-info">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="gallery">
                                                <div id="product-preview" className="vanilla-zoom">
                                                    <div className="zoomed-image">
                                                         <img className="img-fluid d-block small-preview" style={{height:"320px"}} src={`data:image/jpg;base64,${data.pic}`}/></div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info">
                                                <h1>{data.title} Winner {winner.email}</h1>
                                                
                                               {Rate(data.rate)}
                                               {data.rate} rating from {data.totalRtr} reviews  
                                                {role()} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               <div className="product-info">
                                    <div>
                                        
                                        <ul className="nav nav-tabs" role="tablist" id="myTab">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" role="tab" data-bs-toggle="tab" id="description-tab" href="#description">Description</a></li>
                                        </ul>

                                        <textarea style={{height:"200px"}} class="form-control"id="signature" rows="4" name="signature" value={data.desc}></textarea>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active description" role="tabpanel" id="description">
                                                <div className="row">
                                                    <div className="col-md-5" style={{width: "300px"}}>
                                                        <div className="d-xl-flex align-items-xl-center">
                                                            <p>Bid Type : {data.type}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7" >
                                                    <div class="col">
                                         <div class="progress progress-sm">
                                                        <div class="progress-bar bg-success" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: `${data.per}%`}}></div>
                                                    </div>
                                      <h1 class="small font-weight-bold">{data.date} {data.time} left to {data.sDate}{data.eDate}</h1>
                                                   
                                                </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-7 right">
                                                        <div className="d-xl-flex align-items-xl-center">
                                                            <p >Tags : {data.tag}</p>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                              
                                    <button class="nice-select open  current selected " aria-expanded="false" data-toggle="dropdown" >Rate…</button>
                                     <div class="dropdown-menu">
                                            <a data-value="5" class="dropdown-item " id="10" onClick={(e)=>handleRate(e.target.id)}>Perfect</a>
                                            <a data-value="4" class="dropdown-item " id="8"onClick={(e)=>handleRate(e.target.id)}>Good</a>
                                            <a data-value="3" class="dropdown-item " id ="6"onClick={(e)=>handleRate(e.target.id)}>Average</a>
                                            <a data-value="2" class="dropdown-item " id="4"onClick={(e)=>handleRate(e.target.id)}>Not that bad</a>
                                            <a data-value="1" class="dropdown-item " id="2"onClick={(e)=>handleRate(e.target.id)}>Very poor</a>
                                        <ul class="list">
                                       
                                            </ul>
                                </div>
                                           
                                <label for="message">Message</label>
                                    <textarea class="form-control" id="message" name="message"></textarea></div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" type="submit">Send</button>
                                    </div>
                                                </div>
                                            </div>
                                            <form>
                               
                               </form>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            
                        </div>
                      
                        
                    </section>
                   
                <Footer/>
            </div>
            
               ); 
    }
export default ClientAuctionDetail;