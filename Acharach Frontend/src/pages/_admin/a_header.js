import React,{useState,useEffect} from "react"

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
                     <li className="nav-item"><a className="nav-link active" href="/adm">Dashboard</a></li>
                     <li className="nav-item"><a className="nav-link" href="/adm/auctions">Auction List</a></li>
                     <li className="nav-item"><a className="nav-link" href="/adm/clients">Client List</a></li>
                     <li class="nav-item dropdown no-arrow mx-1">
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

                <div className="dropdown-divider"></div><a className="dropdown-item" onClick={logout}><i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout</a>
            </div>
        </div>
     </nav>
     </div>}
   </React.Fragment> 
        );
    }
export default Header;