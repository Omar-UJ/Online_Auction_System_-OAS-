import React, { Fragment, useEffect, useState } from "react"
import AdminServices from "../../Services/admin-services";
import Header from "./a_header"
import Footer from "./a_footer"
import AuctionServices from "../../Services/auction-services";
import Rate from "../rate";
const auctionServices = new AuctionServices();

const adminServices = new AdminServices()
function AdminAuctions(){
        const[data,setData] = useState([]);
        const chkImage= (d)=>{
            if(d.length<50)return `/img/icon/sewing_patch_128px.png`;
            else return  `data:image/jpg;base64,${d}`;
          }
        const update = ()=>{
     
            const fil = {
              filter:'_getAuction'
            }
            auctionServices.GetAuction(fil).then((result)=>{
              setData(result.data);
           }).catch((error)=>{
               alert(error);
           });
          }
       /*  const search= (value)=>{
            const search = {
              search:value
            }
          auctionServices.SearchAuction(search).then((result)=>{
            setData(result.data)
          }).catch((error)=>{
            alert(error)
          })
        } */
  const search = event => {
            const search = {
                search:event
            }
            adminServices.SearchClient(search).then((result)=>{
                setData(result.data)
            }).catch((error)=>{
            })
              };
        const activate = event => {
            const email = {
                email:event
            }
            adminServices.ActivateClient(email).then((result)=>{
            }).catch((error)=>{
            })
              };
              const deactivate = event => {
                const email = {
                    email:event
                }
                adminServices.DeactivateClient(email).then((result)=>{
                }).catch((error)=>{
    
                })
                  };
         


         const chkActive = event => {
            event = event + ""
   
                if(event.substring(2,3)==="1")return true;
                else return false;
              };
              const chkDeactivate = event => {
                event = event + ""
                    if(event.substring(2,3)==="1")return false;
                    else return true;
                  };
        useEffect(()=>{
           
            update()
        },[]);
        
        return(
            <div id="page-top">
            <div id="wrapper">
                <Header/>
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content " style={{marginTop:"60px"}}>
                       
                        <div className="container-fluid">
                            <div className="card shadow">
                                <div className="card-header py-3">
                                    <p className="text-primary m-0 font-weight-bold">Manage Auction </p>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                      {/*   <div className="col-md-6">
                                            <div className="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" onChange={(e)=>search(e.target.value)} className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"/></label></div>
                                     </div> */}
                                    </div>
                                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                        <table className="table my-0" id="dataTable">
                                            <thead>
                                                <tr>
                                                     <th>Thumbnail</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Owner-ID</th>
                                                    <th>Auction_ID</th>
                                                    <th>Account Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data && data.length>0 ?
                                                    data.map((item,index)=>{
                                                        return(
                                                            <Fragment>
                                                            <tr>
                                                                <td><img class="img-fluid d-block mx-auto"   style={{width:'200px'}}  src={chkImage(item.pic)} /></td>
                                                               <td>{item.title}</td>
                                                               <td ><textarea  disabled={true} style={{width:'400px'}}>{item.desc}</textarea></td>
                                                               <td>{item.cID}</td>
                                                               <td>{item.id}</td>
                                                               <td><button class="btn btn-primary btn-sm" disabled={chkActive(item.status)} onClick={()=>activate(item.email)}>Remove</button></td>
                                                           </tr>
                                                               </Fragment>
                                                              
                                                        )
                                                    })
                                                    :
                                                    "No Data"
                                            
                                                }
                                              
                                               </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
            </div>
        </div>
        );
    }

export default AdminAuctions;