import React,{useState,useEffect} from "react"
import Header from "./c_header"
import Footer from "./c_footer"
import { useNavigate,useLocation } from "react-router-dom";
import AuctionServices from "../../Services/auction-services";
 const auctionServices = new AuctionServices();
function EditBid(){ 
  const navigate = useNavigate();
  const [data,setData] = useState('');
  const item = useLocation();
  const [itemTitle,setTitle] = useState('');
  const [itemDesc,setDesc] = useState('');
  const [itemPrice,setPrice] = useState('');
  const [itemPic,setPic] = useState('');
  const [auctionType,setType] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [clientId,setClientId] = useState('');
  const [auctionTag,setTag] = useState('');
  const [access,setAccess] = useState('');
    const [auctionID,setAuctionID] = useState('');
  const [type_placeholder,setType_placeholder] = useState('');
  const user = useLocation();

  const tagSave = (value)=>{
    setTag(value);
}
  const userIdSave = (value)=>{
    setClientId(value);
}
  const endDateSave = (value)=>{
    setEndDate(value);
}
 const startDateSave = (value)=>{
    setStartDate(value);
    alert(startDate);
}

  const titleSave = (value)=>{
      setTitle(value);
  }
  const typeSave = (value)=>{
    setType(value);
    if(value==1)setType_placeholder("Public");
    else setType_placeholder("Private");
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
    setPic(value);
}
const priceSave = (value)=>{
    setPrice(value);
}
const descSave = (value)=>{
    setDesc(value);
}
useEffect(()=>{
       
  auctionServices.GetSelectedAuction(item.state).then((result)=>{
      if(result.data!=null){
        setData(result.data);  
        if(data.access==0)setType_placeholder("Public")
        else setType_placeholder("Private")
      }  
   }).catch((error)=>{
       alert(error);
   }); 
},[]);
  const updateAuction = ()=>{
    const data = {
        title:itemTitle,
        desc:itemDesc,
        price:itemPrice,
        pic:itemPic,
        tag:auctionTag,
        type: auctionType,
        sDate: startDate,
        eDate: endDate,
        id: user.state.id,
        access:access
    } 
     
    auctionServices.UpdateAuctionInfo(data).then((Response)=>{
      alert(Response.data)
  }).catch((error)=>{
      alert(error)
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
                <div className="col-lg-5 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-register-image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/img/bkg1.jpg)`}}>

<div class="holder">

  <div class="_da">
    <span class="visible">
      Drag  drop image here or
      <span class="select" role="button">Browse</span>
    </span>
    <span class="on-drop">Drop images here</span>
    <input name="file" type="file" class="file" multiple />
  </div>

  <div class="container_img"></div>
</div>


                    </div>

                   </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                           
                            <div class="card-header py-3">
                                            <p class="text-primary m-0 font-weight-bold">Edit Your Bid!</p>
                                        </div>
                            <form className="user" style={{paddingtop: "10px"}}>
                                  
                                <div className="form-group row" >
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                      <input className="form-control form-control-user" type="text" id="exampleAuctionName" placeholder={data.title} name="atitle" onChange={(e)=>titleSave(e.target.value)}/>
                                      </div>
                                    <div className="col-sm-6">
                                      <input className="form-control form-control-user" type="text" id="exampleTag" placeholder={data.tag} name="tags" onChange={(e)=>tagSave(e.target.value)}/>
                                      </div>
                                </div>
                                <div className="form-group row" >
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle form-control form-control-user" aria-expanded="false" data-toggle="dropdown" type="button">Auction Type </button>
                                     <div class="dropdown-menu">
                                        <a class="dropdown-item"  Value={0}  onChange={(e)=>typeSave(e.target.value)}>Open</a>
                                        <a class="dropdown-item"  Value={1}  onChange={(e)=>typeSave(e.target.value)}>Closed</a>
                                </div>
                            
                                      </div></div>
                                    <div className="col-sm-6">
                                      <input className="form-control form-control-user" type="text" id="exampleTag" placeholder={data.price} name="tags" onChange={(e)=>priceSave(e.target.value)} />Birr
                                      </div>
                                </div>
                      <div className="form-group row" >
                      <div class="form-group"><label for="signature"><strong>Description</strong><br/></label>
                      <textarea class="form-control" id="signature" rows="4" name="signature" placeholder={data.desc} onChange={(e)=>descSave(e.target.value)}></textarea></div>
                                </div>

                      

                                 <div className="form-group row" style={{display:"true"}} >
                                    <div className="col-sm-6 mb-3 mb-sm-0 ">
                                    
                                             <div class="col-md-12 offset-sm-0 ">
                                             <label for="signature"><strong>Start Date</strong></label>
                                                <input class="form-control form-control-user" type="date" onChange={(e)=>startDateSave(e.target.value)}/>
                                            </div>
                                           
                                </div>
                                <div className="col-sm-6 mb-3 mb-sm-0 ">
                                    
                                    <div class="col-md-12 offset-sm-0 ">
                                    <label for="signature"><strong>End Date</strong></label>
                                       <input class="form-control form-control-user" type="date" onChange={(e)=>endDateSave(e.target.value)} />
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
                                    <button class="btn btn-primary dropdown-toggle form-control form-control-user" aria-expanded="false" data-toggle="dropdown" type="button">{type_placeholder}</button>
                                     <div class="dropdown-menu">
                                        <a class="dropdown-item"   onClick={()=>accessPublic()}>Public</a>
                                        <a class="dropdown-item"  onClick={()=>accessPrivate()}>Private</a>
                                </div>
                                      </div></div>
                              
                                </div>
                                
                                <span className="btn btn-primary btn-block text-white btn-user" type="submit" onClick={()=>updateAuction()}>Update</span>
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

export default EditBid;