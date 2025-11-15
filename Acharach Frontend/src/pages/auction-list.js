import React,{useState,useEffect} from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"
import AuctionServices from "../Services/auction-services";

const auctionServices = new AuctionServices();

<style jsx>{`.table_hoover:hover {
            border-color: blue;
            color: black;
            paddin
            border-radius: 0.25rem;
          }
     `}</style>

function ClientAuctionList(){
    const[data,setData] = useState([]);

   // const user = useLocation();

    useEffect(()=>{
        auctionServices.GetAuction().then((result)=>{
            setData(result.data);
         
         }).catch((error)=>{
             alert(error);
         });
    },[]);
    const handleSlectedAuction = (index)=>{
       /*  navigate("/cln/c-auction-detail",{state:{
                id:index.id,
                email:user.state.email
              //  client_id:user.state.client_id
            }
        }); */
    }
        return(
<div>
<style jsx>{`
        .auction-body {
          padding-left: 15px;
          padding-right: 15px;

        }

        .auction-body:hover {
          color: #b179ff;
          padding: 18px;

        }


     
      `}</style>
    <Nav/>   
        <section className="clean-block clean-catalog dark">
        <div className="w-auction-back">
        <div class="container" style={{marginTop:"70px"}}>
        <div className="content">
          <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
               Upcoming Auction  </h2>
            </div>
        </div>
        <div className="row">
                        <div class="col-md-9 " >
                            <div class="products" >
                                <div class=" row no-gutters">
                                        {
                                                    data && data.length>0?
                                                    
                                                    data.map((item,index)=>{
                                                        return(   
                            <React.Fragment > 
                                        <div class=" col-12 col-md-6 col-lg-4 "   style={{padding:"20px"}}>
                                        <div class="auction-body  clean-product-item  shadow  " >
                                        <div class="rating">                                              
                                                    
                                            <table width="100%">
                                                    <tr>
                                            <td>  <p>{item.type}</p></td>
                                                    </tr>
                                            </table>
                                                </div> 
                                            <div class="image " onClick={(e)=>handleSlectedAuction(item)}>
                                                <img  alt="" class="img-fluid d-block mx-auto" width="200" height="200" src= {`data:image/jpg;base64,${item.pic}` }onClick={(e)=>handleSlectedAuction(item)}/>
                                                </div>
                                            <div class=" product-name">
                                                <h4>{item.title}</h4>
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                    <div class="col">
                                         <div class="progress progress-sm">
                                                        <div class="progress-bar bg-success" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: `${item.per}%`}}></div>
                                                    </div>
                                      <h1 class="small font-weight-bold">{item.date} {item.time} left to {item.sDate}{item.eDate}</h1> 
                                                </div>
                                            </div>
                                            <div class="about">
                                                <div class="rating" style={{marginbottom:"50px"}}>
                                                         <div class="rating" style={{marginbottom:"50px"}}>
                                                         <img  alt="" src={`/img/icon/eye_480px.png`}/>
                                                         <p>{item.view}</p> 
                                                            
                                                                </div>   </div>
                                                                
                                                <div class="price">
                                                    <h3>{item.price} Birr</h3>
                                                </div>
                                            </div></div></div>
                                     </React.Fragment>
                                                              
                                                        )
                                                    })
                                                    :
                                                    <React.Fragment>
                                                        <div className="rating">
                                                            <center><img  alt="" src={`/img/icon/database_error_128px.png`}/>  </center> 
                                                            <center>No Data </center>
                                                            </div>
                                                    </React.Fragment>
                                                }
                                        </div>
                                    </div>
                                    </div>
                                    </div>

          </div>
          <div className="content">
                    
                        <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
               All Auction  </h2>
            </div>
        </div><div className="row">
                        <div class="col-md-9 " >
                            <div class="products" >
                                <div class=" row no-gutters">
                                        {
                                                    data && data.length>0?
                                                    
                                                    data.map((item,index)=>{
                                                        return(   
                            <React.Fragment onClick={(e)=>handleSlectedAuction(item)}> 
                                        <div class=" col-12 col-md-6 col-lg-4 "   style={{padding:"20px"}}  onClick={(e)=>handleSlectedAuction(item)}>
                                        <div class="auction-body  clean-product-item  shadow  " onClick={(e)=>handleSlectedAuction(item)}>
                                        <div class="rating"onClick={(e)=>handleSlectedAuction(item)}>                                              
                                                    
                                            <table width="100%">
                                                    <tr>
                                            <td>  <p>{item.type}</p></td>
                                                    <td align="right" >
                                                        
                                                         <div  >
                                                         {(() => {
                  if (item.eDate === "End") {
                    return (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="green" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check">
                          <title className="table_hoover"> Bid Started</title>
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <polyline points="17 11 19 13 23 9"></polyline>
                        </svg>
                        <p>{item.view}</p>
                        
                      </>
                    )
                  } else if (item.sDate === "Start") {
                    return (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-x">
                          <title>Bid Not Started</title>
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="18" y1="8" x2="23" y2="13"></line>
                          <line x1="23" y1="8" x2="18" y2="13"></line>
                        </svg>
                        
                      </>
                    )
                  } else {
                    return (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="red" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
                          <title>Bid Has Ended</title>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                                                                          </>
                                                              )
                                                              
                                                            }
                                                          })()}
                                                        </div>      
                                                    </td>
                                                    </tr>
                                            </table>
                                                </div> 
                                            <div class="image " onClick={(e)=>handleSlectedAuction(item)}>
                                                <img  alt="" class="img-fluid d-block mx-auto" width="200" height="200" src= {`data:image/jpg;base64,${item.pic}` }onClick={(e)=>handleSlectedAuction(item)}/>
                                                </div>
                                            <div class=" product-name">
                                                <h4>{item.title}</h4>
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                    <div class="col">
                                         <div class="progress progress-sm">
                                                        <div class="progress-bar bg-success" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: `${item.per}%`}}></div>
                                                    </div>
                                      <h1 class="small font-weight-bold">{item.date} {item.time} left to {item.sDate}{item.eDate}</h1> 
                                                </div>
                                            </div>
                                            <div class="about">
                                                <div class="rating" style={{marginbottom:"50px"}}>
                                                         <div class="rating" style={{marginbottom:"50px"}}>
                                                         <img alt=""  src={`/img/icon/eye_480px.png`}/>
                                                         <p>{item.view}</p> 
                                                            
                                                                </div>   </div>
                                                                
                                                <div class="price">
                                                    <h3>{item.price} Birr</h3>
                                                </div>
                                            </div></div></div>
                                     </React.Fragment>
                                                              
                                                        )
                                                    })
                                                    :
                                                    <React.Fragment>
                                                        <div className="rating">
                                                            <center><img  alt="" src={`/img/icon/database_error_128px.png`}/>  </center> 
                                                            <center>No Data </center>
                                                            </div>
                                                    </React.Fragment>
                                                }
                                        </div>
                                    </div>
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

export default ClientAuctionList;