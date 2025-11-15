import React,{useState,useEffect} from "react"
import NotficationServices from "../../Services/notification-services"
const notficationServices = new NotficationServices();
function Header(){
    const logout = ()=>{
        sessionStorage.clear();
        sessionStorage.setItem("status","out")
        window.location = "/"
    }
    const [AccType,setAccType]=useState()
    const AccountType = (a)=>{
        if(a >= 500 && a < 600){
            setAccType("Pro")
        }else if(a>=600)setAccType("Premium")
        else {
            setAccType("Basic")
            sessionStorage.setItem("account_verified_sell",false)
        }
    }
    const plan = ()=>{
        if(AccType == "Premium"){
           return <></>
        }
        else return(
            <li className="nav-item"><a className="nav-link" href="/cln/c-upgrade">Get Premium</a></li>
        )
    }
    const [notif,SetNotf] = useState(null)
    const [count,setCount]=useState()
    const Count = (i)=>{
        if(i!=0)setCount(i)
    }
  useEffect(() => {
    AccountType(sessionStorage.getItem("account_status"))
    if(notif===null){
      const dest = {
        dest_email:sessionStorage.getItem("email")
    }
      notficationServices.GetTopNotf(dest).then((result)=>{
        SetNotf(result.data)
        Count(result.data.length)
  }).catch((error)=>{
  })
    }
  }, []);
        return(
            <React.Fragment>
      {
      <div >
     <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
     <div className="container">
   
     <div class="header-logo">
        						<a href="/" title="Bidout">
															<img class="img-fluid" 
                              width={'35px'}
                height={'35px'}  
                src={`/img/img/photo_2023-02-13_22-24-17.jpg`} alt="Bidout"/>
                  </a>
										    </div>
             <div className="collapse navbar-collapse" id="navcol-1">
                 <ul className="navbar-nav ml-auto">
                     <li className="nav-item"><a className="nav-link active" href="/cln">Dashboard</a></li>
                     <li className="nav-item"><a className="nav-link" href="/cln/c-auction-list">Auction List</a></li>
                      {plan}
                     <li className="nav-item"><a className="nav-link" href="/cln/c-conatct-us">Contact Us</a></li>
              
                     <li class="nav-item dropdown no-arrow mx-1">
       
                                <div class="nav-item dropdown no-arrow hide"><a class="dropdown-toggle nav-link" aria-expanded="true" data-toggle="dropdown" href="#">
                                    <i class="fas fa-bell fa-fw">  <img class="border rounded-circle img-profile" width={"25px"} height="25px" src={`/img/icon/received_512px.png`}/></i>                      
                                                  <span class="badge badge-danger badge-counter">{count}</span></a>
                                    
                                    <div class="dropdown-menu dropdown-menu-right dropdown-list animated--grow-in hide">
                                        <h6 class="dropdown-header">New Notification</h6>
                                        {
                                                notif && notif.length>0?
                                                notif.map((ntf,index)=>{
                                                             return(
                                                                 <a class="dropdown-item d-flex align-items-center" href="/cln/notf">
                                            <div class="mr-3">
                                                <div class="bg-primary icon-circle">
                                                <img class="rounded-circle" width={'45px'}
                                                         height={'45px'}  src={`/img/icon/received_512px.png`}/>
                                                        </div>
                                            </div>
                                            <div>
                                                <span class="small text-gray-500">{ntf.title}</span>
                                              <p>{ntf.desc.substring(0,30)}...{ntf.date.substring(0,10)}</p>
                                            </div>
                                        </a>
                                                             )
                                                })
                                                :
                                                <React.Fragment>
                                                <div className="rating">
                                                    <center><img src={`/img/icon/chat_bubble_512px.png`}/>  </center> 
                                                    </div>
                                            </React.Fragment>
                                        }
                                        
                                       
                                        <a class="dropdown-item text-center small text-gray-500" href="/cln/notf">Show All Notification</a>
                                    </div>
                                </div>
                            </li>
                            </ul>    
                            </div>
         </div>
         <div className="nav-item dropdown no-arrow" >
            
            <a className="dropdown-toggle nav-link"  data-toggle="dropdown" href="#">
            <img class="border rounded-circle img-profile" width={"40px"} height="40px" src={`data:image/jpg;base64,${sessionStorage.getItem("profilePic")}`}/>
                <span class="d-none d-lg-inline mr-2 text-gray-600 small">{sessionStorage.getItem("email")}  {AccType}</span>
               </a>
            <div className="dropdown-menu shadow dropdown-className-left animated--grow-in">
                <a class="dropdown-item" href="/cln/profile">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Profile</a>
                <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400">
                        </i>&nbsp;Settings</a><a class="dropdown-item" href="#">
                            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400">
                                </i>&nbsp;Activity log</a>
                <div className="dropdown-divider"></div><a className="dropdown-item" onClick={logout}><i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout</a>
            </div>
        </div>
     </nav>
     </div>}
   </React.Fragment> 
        );
    }
export default Header;