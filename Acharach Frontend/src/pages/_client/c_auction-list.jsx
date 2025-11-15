import React,{useState,useEffect} from "react"
import Nav from "../_client/c_header"
import Footer from"../_client/c_footer"
import AuctionServices from "../../Services/auction-services";
import Rate from "../rate";

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
    const[category,setCategory] = useState([]);
    const[filter_type,setFilterType] = useState();



//Check if the image is null
const chkImage= (d)=>{
  if(d.length<50)return `/img/icon/sewing_patch_128px.png`;
  else return  `data:image/jpg;base64,${d}`;
}
const update = (filter,id)=>{
  setFilterType(id)
  const fil = {
    filter:filter
  }
  auctionServices.GetAuction(fil).then((result)=>{
    setData(result.data);
 }).catch((error)=>{
     alert(error);
 });
}
    useEffect(()=>{
        update("_getAuction","Ordered By Rate ASC")
         auctionServices.GetCategory().then((result)=>{
          setCategory(result.data);
       }).catch((error)=>{
           alert(error);
       });
    },[]);

    const handleSlectedAuction = (index)=>{
      sessionStorage.setItem("selected_item",index.id)
       window.location = "/cln/c-auction-detail"
    }
    const search= (value)=>{
        const search = {
          search:value
        }
      auctionServices.SearchAuction(search).then((result)=>{
        setData(result.data)
      }).catch((error)=>{
        alert(error)
      })
    }
        return(
<div>
    <Nav/>
    <main className="page catalog-page">
        <section className="clean-block clean-catalog dark">
      
        <div className="content">
                    <div className="row">
                    <div  style={{height:"10px"}} class=" a-inner-banner ">
<div class="container" style={{marginTop:"50px",height:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Auction List</h2>   
                                              
            </div>                              
    
                        </div>
                        <div className="col-md-3">
                            <div className="d-none d-md-block">
                            <div id="block-35" class="shop-widget-item widget_block widget_search">
                                  <form role="search"  style={{marginLeft:"50px",width:"300px"}}  class="wp-block-search__button-outside wp-block-search__text-button wp-block-search">
                                    <label style={{marginTop:"17px"}} for="wp-block-search__input-1" class="wp-block-search__label">Search</label>
                                    <div class="wp-block-search__inside-wrapper ">
                                      <input type="search" id="wp-block-search__input-1" class="wp-block-search__input" name="s" onChange={(e)=>search(e.target.value)} placeholder="Search products…" required=""/>

                                     </div>
                                     
                                     </form>
                                  
                                     
                                     </div>   



                            <div id="block-35" class="shop-widget-item widget_block widget_search">
                                  <form   style={{marginLeft:"50px",width:"300px"}}  class=" wp-block-search__text-button wp-block-search">
                                    <label style={{marginTop:"17px"}} for="wp-block-search__input-1" class="wp-block-search__label">Filter</label>
                                    <button class="nice-select closed  current selected " aria-expanded="false" data-toggle="dropdown" >{filter_type}</button>
                                      <div class="dropdown-menu">
                                            <a data-value="5" class="dropdown-item " id="Ordered By Rate ASC"  onClick={(e)=>{update("_getAuction",e.target.id)}}>Ordered By Rate ASC</a>
                                            <a data-value="5" class="dropdown-item " id="Ordered By Start Date ASC"  onClick={(e)=>{update("_getAuctionBySDateASC",e.target.id)}}>Ordered By Start Date ASC</a>
                                            <a data-value="4" class="dropdown-item " id="Ordered By Start Date DESC"  onClick={(e)=>{update("_getAuctionBySDateDESC",e.target.id)}}>Ordered By Start Date DESC</a>
                                            <a data-value="5" class="dropdown-item " id="Ordered By End Date ASC"  onClick={(e)=>{update("_getAuctionByEDateASC",e.target.id)}}>Ordered By End Date ASC</a>
                                            <a data-value="4" class="dropdown-item " id="Ordered By End Date DESC"  onClick={(e)=>{update("_getAuctionByEDateDESC",e.target.id)}}>Ordered By End Date DESC</a>
                                           
                                </div>
                                     </form>
                                  
                                     
                                     </div>
                                <div className="filters"> 
                                
                                       <div className="filter-item">
                                        <div id="block-33" class="shop-widget-item widget_block">
                                        <div class="shop-widget-title">
                                        <h3>Product Category</h3>
                                        </div>
                                        <div class="wp-widget-group__inner-blocks">
                                        <div data-block-name="woocommerce/product-categories" class="wp-block-woocommerce-product-categories wc-block-product-categories is-list ">
                                        <ul class="wc-block-product-categories-list wc-block-product-categories-list--depth-0">	
                                        
                                        {
                                                    category && category.length>0?
                                                    category.map((cate,index)=>{
                                                  
                                                        return(   
                                                          <li class="wc-block-product-categories-list-item">			
                                                          <a  >
                                                          <span class="wc-block-product-categories-list-item__name"onClick={(e)=>search(cate.title)}>{cate.title}</span></a>
                                                          <span class="wc-block-product-categories-list-item-count">
                                                         <span  class="screen-reader-text">{cate.amount} products</span>
                                                          </span>	
                                                                </li>		
                                                        )
                                                    })
                                                    :
                                                    <React.Fragment>
                                                        <div className="rating">
                                                            <center><img src={`/img/icon/database_error_128px.png`}/>  </center> 
                                                            <center>No Data </center>
                                                            </div>
                                                    </React.Fragment>
                                                }
                                                                                                              </ul></div></div></div> </div>
                                   
                                </div>
                            </div>
                          
                        </div>
                        <div class=" col-md-9 " >
                            <div class="list-scrollable products"  >
                                <div class="row no-gutters">
                                        {
                                                    data && data.length>0?
                                                    data.map((item,index)=>{
                                                  
                                                        return(   
                            <React.Fragment onClick={(e)=>handleSlectedAuction(item)}> 
                                        <div class=" col-12 col-md-6 col-lg-4 "   style={{padding:"20px"}}  onClick={(e)=>handleSlectedAuction(item)}>
                                        <div class="clean-product-item  shadow  " onClick={(e)=>handleSlectedAuction(item)}>
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
                                            <div class="image " style={{width:"300px" ,heghit:"350px"}} onClick={(e)=>handleSlectedAuction(item)}>
                                                <img class="img-fluid d-block mx-auto"    src={chkImage(item.pic)} onClick={(e)=>handleSlectedAuction(item)}/>
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
                                                         <img src={`/img/icon/eye_480px.png`}/>
                                                         <p>{item.view}</p> 
                                                                </div>   </div>

                                                                   <div class="rating" style={{marginbottom:"50px"}}>
                                                         <div class="rating" style={{marginbottom:"50px"}}>
                                                         <title className="table_hoover">{item.rate}</title>
                                                          {Rate(item.rate)}
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
                                                            <center><img src={`/img/icon/database_error_128px.png`}/>  </center> 
                                                            <center>No Data </center>
                                                            </div>
                                                    </React.Fragment>
                                                }
                                        </div>
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

export default ClientAuctionList;