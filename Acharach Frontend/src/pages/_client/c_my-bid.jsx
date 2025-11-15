import React,{useState,useEffect} from "react"
import Nav from "./c_header"
import Footer from"./c_footer"
import AuctionServices from "../../Services/auction-services";

const auctionServices = new AuctionServices();

function MyBid(){
    const[data,setData] = useState([]);
    useEffect(()=>{
        auctionServices.GetMyBid(data).then((result)=>{
            setData(result.data);
         }).catch((error)=>{
             alert(error);
         });
    },[]);
    const handleSlectedAuction = (index)=>{
     sessionStorage.setItem("selected_item",index.id)
    }
        return(
<div>
    <Nav/>
    <main className="page catalog-page">
        <section className="clean-block clean-catalog dark">
        <div class="container" style={{marginTop:"70px"}}>
                </div>
        <div className="content">
                    <div className="row">
                     
                        <div class="col-md-9 " >
                            <div class="products" >
                                <div class=" row no-gutters">
                                        {
                                                    data && data.length>0 ?
                                                    data.map((item,index)=>{
                                                        return(
                            <React.Fragment>
                                        <div class=" col-12 col-md-6 col-lg-4 " style={{padding:"20px"}}  onClick={(e)=>handleSlectedAuction(item)}>
                                        <div class="clean-product-item  shadow  ">
                                        <div class="rating">
                                                    <p>{item.type}</p>
                                                </div> 
                                            <div class="image " ><a href="">
                                                <img class="img-fluid d-block mx-auto" src={`data:image/jpg;base64,${item.pic}`} onClick={(e)=>handleSlectedAuction(item)}/>
                                                </a></div>
                                            <div class=" product-name">
                                                <p>{item.title}</p>
                                                </div>
                                                <p>Duration {item.sDate}-{item.eDate}</p>
                                            <div class="about">
                                                <div class="rating" style={{marginbottom:"50px"}}>
                                                    <img src={`/img/icon/eye_480px.png`}/>
                                                            <p>{item.view}</p>
                                                                </div>
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
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item disabled"><a className="page-link" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                        <li className="page-item active"><a className="page-link">1</a></li>
                                        <li className="page-item"><a className="page-link">2</a></li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item"><a className="page-link" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                                    </ul>
                                </nav>
                            </div>
        </section>
    </main>
    <Footer/>
</div>

   );
    }

export default MyBid;