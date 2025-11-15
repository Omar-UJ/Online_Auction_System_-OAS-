import React,{useState,useEffect} from "react"
import Header from "./c_header"
import Footer from "./c_footer"
import AuctionServices from "../../Services/auction-services";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const auctionServices = new AuctionServices();

function ClientHome(){ 
   
  const [itemTitle,setTitle] = useState('');
  const [itemDesc,setDesc] = useState('');
  const [itemPrice,setPrice] = useState('');
  const [itemPic,setPic] = useState('');
  const [displayItemPic,setDisplayPic] = useState('');
  const [auctionType,setType] = useState('');
  const [Type,type_placeholder] = useState('');
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  const [startTime,setStartTime] = useState('');
  const [endTime,setEndTime] = useState('');
  const [auctionTag,setTag] = useState('');
  const [access,setAccess] = useState('');
  const [access_placeholder,setType_placeholder] = useState('');
  const  showTerms=()=>{
    document.getElementById("termOverlay").style.display = "block";
  }
  const  acceptTerms = ()=> {
    document.getElementById("termOverlay").style.display = "none";
    window.location = "/pay/bid"
  }
  const  rejectTerms = ()=> {
    // Perform action when terms are rejected
   // alert("You have rejected the terms and conditions.");
    document.getElementById("termOverlay").style.display = "none";
    window.location = "/cln"
  }
  useEffect(()=>{
/*     if(sessionStorage.getItem("account_status")<500)
    showTerms() */
  setType_placeholder("Private");
  type_placeholder("Auction Type");
  setAccess(1);

},[]);
  const tagSave = (value)=>{
    setTag(value);
}
  const endDateSave = (value)=>{
    setEndDate(value);
    //alert(endDate.toISOString().substring(0,10)+" "+endDate.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true}))
}
 const startDateSave = (value)=>{
 
    setStartDate(value);
}

const openBid =()=>{
  type_placeholder("OpenBid");
  setType(0)
}
const closedBid =()=>{
  type_placeholder("Close Bid");
  setType(1)
}
  const titleSave = (value)=>{
      setTitle(value);
  }

const accessPublic = ()=>{
  setAccess(1);
  setType_placeholder("Public")
}
const accessPrivate = ()=>{
  setAccess(0);
  setType_placeholder("Private")
  }
  const picSave = (value)=>{
    setPic(value.target.files[0]);
    setDisplayPic(URL.createObjectURL(value.target.files[0]))
}
const priceSave = (value)=>{
    setPrice(value);
}
const descSave = (value)=>{
    setDesc(value);
}
const addAuction = ()=>{
  const formdata = new FormData()
  formdata.append('title',itemTitle)
  formdata.append('desc',itemDesc)
  formdata.append('price',itemPrice)
  formdata.append('pic',itemPic)
  formdata.append('tag',auctionTag)
  formdata.append('type',auctionType)
  formdata.append('sDate',startDate.toISOString().substring(0,10)+" "+startDate.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true}))
  formdata.append('eDate',endDate.toISOString().substring(0,10)+" "+endDate.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true}))
  formdata.append('client_id',sessionStorage.getItem("client_id"))
  formdata.append('access',access)
  alert(formdata.get("sDate"))
  fetch('http://localhost:12758/api/Auction/_addAuction', {
    method: 'POST',
    body: formdata
  }).then((Response)=>{
    alert(Response.data)
  }).catch((error)=>{
    alert(error)
    console.log(error);
  }) 
    }


        return(
            <React.Fragment>
                <Header/>
      {
 <div className="container" style={{paddingtop: "100px"}}>
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <div className="row">
                <div className="ch-home-title">  
                  <div class="inner-banner ">
<div class="container" style={{marginTop:"50px"}}>
<div class="card-header py-3">
              <h1 class="text-primary m-0 font-weight-bold">Place Your Bid Here!</h1>
                                        </div>
            </div>



                        </div>
        </div>


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



                <div className="col-lg-5 d-none d-lg-flex">
                  <img class="flex-grow-1 bg-register-image img-fluid d-block mx-auto"style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/img/bkg1.jpg)`}}   src={displayItemPic} />
                   </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <form className="user" style={{paddingtop: "10px"}}>
                            <input type="file" onChange={picSave} />
                                <div className="form-group row" >
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                      <input className="form-control form-control-user" type="text" id="exampleAuctionName" placeholder="Title" name="atitle" onChange={(e)=>titleSave(e.target.value)}/>
                                      </div>
                                    <div className="col-sm-6">
                                      <input className="form-control form-control-user" type="text" id="exampleTag" placeholder="Bid Tags :- #example" name="tags" onChange={(e)=>tagSave(e.target.value)}/>
                                      </div>
                                </div>
                                <div className="form-group row" >
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle form-control form-control-user"  aria-expanded="false" data-toggle="dropdown" type="button">{Type}</button>
                                     <div class="dropdown-menu">
                                        <a class="dropdown-item"  onClick={()=>openBid()}>Open</a>
                                        <a class="dropdown-item"  onClick={()=>closedBid()}>Closed</a>
                                </div>
                            
                                      </div></div>
                                    <div className="col-sm-6">
                                      <input className="form-control form-control-user" type="text" id="exampleTag" placeholder="Price" name="tags" onChange={(e)=>priceSave(e.target.value)} />
                                      </div>
                                </div>
                                
                      <div className="form-group row" >
                      <div class="form-group"><label for="signature"><strong>Description</strong><br/></label>
                      <textarea class="form-control" id="signature" rows="4" name="signature" onChange={(e)=>descSave(e.target.value)}></textarea></div>
                                </div>

                  
                                 <div className="form-group row" style={{display:"true"}} >
                                    <div className="col-sm-6 mb-3 mb-sm-0 ">
                                    
                                             <div class="col-md-12 offset-sm-0 ">
                                             <label for="signature"><strong>Start Date</strong></label>
                                         <DatePicker 
                                      locale = "es"
                                         selected={startDate}
                                         returnValue
                                         onChange={e=>startDateSave(e)}
                                         timeInputLabel="Start Time"
                                         dateFormat="yyyy/MM/dd p "
                                         showTimeInput
                                         
                                         />
                                            </div>
                                           
                                </div>
                                <div className="col-sm-6 mb-3 mb-sm-0 ">
                                    <div class="col-md-12 offset-sm-0 ">
                                    <label for="signature"><strong>End Date</strong></label>
                                    <DatePicker
                                    locale = "es"
                                     selected={endDate}
                                     onChange={e=>endDateSave(e)}
                                         timeInputLabel="End Time"
                                         dateFormat="yyyy/MM/dd  p "
                                         value={endDate}
                                         showTimeInput
                                         timeCaption="time"
                                         /> 
                                         
                                         </div>
                       </div>                          
                                </div>
                      
                                 <div className="form-group row" style={{display:"true"}} >

                                <div className="col-sm-6 mb-3 mb-sm-0  ">
                               </div>
                                    
                                </div>

                                <div className="form-group row" >
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle form-control form-control-user" aria-expanded="false" data-toggle="dropdown" type="button">{access_placeholder}</button>
                                     <div class="dropdown-menu">
                                        <a class="dropdown-item"   onClick={()=>accessPublic()}>Public</a>
                                        <a class="dropdown-item"   onClick={()=>accessPrivate()}>Private</a>
                                </div>
                                      </div></div>
                              
                                </div>
                                <span className="btn btn-primary btn-block text-white btn-user" type="submit" onClick={()=>addAuction()}>Post</span>
                                <hr></hr>
                            </form>
                            <div className="text-center"><a className="small" href="/">You need help?</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      }<Footer/>
   </React.Fragment> 
        );
    }

export default ClientHome;