import React,{useState,useEffect} from "react"
import Nav from "./c_header"
import Footer from"./c_footer"
import NotficationServices from "../../Services/notification-services"
const notficationServices = new NotficationServices();

export default function Notification(){ 
    const[data,setData] = useState(null);
    const dest = {
        dest_email:sessionStorage.getItem("email")
    }
   useEffect(()=>{
    if(data===null){
        notficationServices.GetNotf(dest).then((result)=>{
    setData(result.data)
}).catch((error)=>{
})
}
   })
        return(
            <React.Fragment> <Nav/>
                <div className="" style={{ padding: "90px" }}>
                <div class="card shadow ">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 font-weight-bold">Notifications</p>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
             {

    data && data.length>0?
    data.map((notif,index)=>{
                 return(
                    <a class="dropdown-item d-flex align-items-center" href="#">
                 <div class="dropdown-list-image mr-3">
                   <img class="rounded-circle" width={'45px'}
                height={'45px'}  src={`/img/icon/received_512px.png`}/>
                     <div class="bg-success status-indicator"></div>
                 </div>
                 <div class="font-weight-bold">
                     <div class="text-truncate"><span>{notif.title}.</span></div>
                     <textarea style={{width:"700px"}} class="form-control"id="signature" rows="4" name="signature" value={notif.desc}></textarea>

                     <p class="small text-gray-500 mb-0">from {notif.author_email}</p>
                 </div>  <p class="right small text-gray-500 mb-0">{notif.date}</p>
             </a>
                 )
})
                 :
                 <React.Fragment>
                 <div className="rating">
                     <center><img src={`/img/icon/chat_bubble_512px.png`}/>  </center> 
                     <center>Empty </center>
                     </div>
             </React.Fragment>
             }
                            </div>
                        </div>
                    </div>

                </div>
              
        <Footer/> 
       </React.Fragment>
   );
    }
