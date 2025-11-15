import React, { Fragment, useEffect, useState } from "react"
import AdminServices from ".././../Services/admin-services";
import Header from "../_admin/a_header"
import Footer from "../_admin/a_footer"
const adminServices = new AdminServices()
function AdminClient(){
        const[data,setData] = useState([]);
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
           
            adminServices.GetClients().then((result)=>{
                setData(result.data);
             }).catch((error)=>{
                 alert(error);
             });
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
                                    <p className="text-primary m-0 font-weight-bold">Manage Client </p>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" onChange={(e)=>search(e.target.value)} className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"/></label></div>
                                        </div>
                                    </div>
                                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                        <table className="table my-0" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>PhoneNumber</th>
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
                                                               <td>{item.first_name}</td>
                                                               <td>{item.last_name}</td>
                                                               <td>{item.email}</td>
                                                               <td>{item.telephone}</td>
                                                               <td><button class="btn btn-primary btn-sm" disabled={chkActive(item.status)} onClick={()=>activate(item.email)}>Activate</button> 
                                                               <button  disabled={chkDeactivate(item.status)}onClick={()=>deactivate(item.email)} class="btn btn-primary btn-sm">Deactivate</button></td>
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

export default AdminClient;