import React,{useState} from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"
import ClientServices from "../Services/client-services";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JavaScript
import {  initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from '../translations/en/global.json';
import amTranslation from '../translations/am/global.json';
import AdminServices from '../Services/admin-services'
const adminServices = new AdminServices();

const clientServices = new ClientServices();
<style jsx>{`.is-invalid {
            border-color: red;
            color: red;
            background-color: #ffe7e7;
            padding: 0.375rem 0.75rem;
            border-radius: 0.25rem;
          }
     `}</style>

     // Initialize i18next with translations
i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      am: { translation: amTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

function Welcome(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [adminChk,setAdminCheck] = useState('');
    const [errors, setErrors] = useState(0);
    const [error_msg, setErrorMsg] = useState("");  
    const setAdminChk = ()=>{
        setAdminCheck(true)
    }
    const emailChange = (value)=>{
        setEmail(value);
/* 
        if(!value.includes("@")||value==''){
            setErrors(1);
            setErrorMsg("Invalid Email Address")
        }else {
            setErrors(errors - 1);
            setErrorMsg("");
          } */
    }
    const passwordChange = (value)=>{
        setPassword(value);
        /* const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,20}$/;
        if (passwordRegex.test(value)||value=='') {
          setErrors(2);
          setErrorMsg("Password should be 8-20 characters!");
        }else {
          setErrors(errors - 1);
          setErrorMsg("");
        } */
    }
    const handleSave = ()=>{
        const data = {
            email:email,
            password:password
        }   
if (email===''){
            setErrors(-2)
            setErrorMsg("Email empty")
            }
            else if(password===''){
                setErrors(-3)
                setErrorMsg("Password Empty")
            } else if(adminChk){
                adminServices.GetAdmin(data).then((Response)=>{
                 if(Response.data.isSuccess){
          
                     sessionStorage.setItem("admin_id",Response.data.client.cID)
                     sessionStorage.setItem("email",Response.data.client.email)
                     sessionStorage.setItem("first_name",Response.data.client.first_name)
                     sessionStorage.setItem("last_name",Response.data.client.last_name)
                     sessionStorage.setItem("telephone",Response.data.client.telephone)
                     sessionStorage.setItem("user_id",Response.data.client.id)
                     sessionStorage.setItem("profilePic",Response.data.client.profilePic)
                     sessionStorage.setItem("account_status",Response.data.client.status)
                     sessionStorage.setItem("status","in")
     
                       window.location='adm'
     
                 }else {
                         setErrors(-4)
                         setErrorMsg("User name or password incorrect ! ")
                 }
            }).catch((error)=>{
               alert((error))
                } )
                 }
            else{
           clientServices.GetClient(data).then((Response)=>{
            if(Response.data.isSuccess){
     
                sessionStorage.setItem("client_id",Response.data.client.cID)
                sessionStorage.setItem("email",Response.data.client.email)
                sessionStorage.setItem("first_name",Response.data.client.first_name)
                sessionStorage.setItem("last_name",Response.data.client.last_name)
                sessionStorage.setItem("telephone",Response.data.client.telephone)
                sessionStorage.setItem("user_id",Response.data.client.id)
                sessionStorage.setItem("profilePic",Response.data.client.profilePic)
                sessionStorage.setItem("account_status",Response.data.client.status)
                sessionStorage.setItem("status","in")

                  window.location='cln'

            }else {
                    setErrors(-4)
                    setErrorMsg("User name or password incorrect ! ")
            }
       }).catch((error)=>{
          alert((error))
           } )
            }
      


}
        return(
            <React.Fragment>   <Nav/>
      {
      <div  >
    
    <section className="clean-block  home-text" >
           <div className="text welcome">
            <div className="container" style={{marginTop:"70px"}}>
            <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Welcome to Acharach</h2>
            </div>
        </div>
        <div  className="card shadow-lg o-hidden border-0 my-6" >
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-flex">
                    <img  alt=""  src={`/img/bg/png/how-work1.png`}/>
                   </div>
                   <div className="col-lg-4">
                                <div className="p-3">
                                    <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg  o-hidden border-0 my-4">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="p-3">
                                    <p className="login-h2">Login</p>
                                    <form className="user">
                                        <div className="form-group"><input  className={`form-control form-control-user ${
                          error_msg && (errors===1||-2||-4) && "is-invalid"
                        }`}  type="email" id="exampleInputEmail"   aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" onChange={(e)=>emailChange(e.target.value)}/></div>
                                        
                                        <div className="form-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                            <input  className={`form-control form-control-user ${
                        error_msg && (errors===2||-3||-4) && "is-invalid"
                        }`}  type="password" id="exampleInputPassword" 
                                        placeholder="Password" name="password" onChange={(e)=>passwordChange(e.target.value)}/></div>
                                          
                                         <div>
                                           {errors !== 0 && (
                                             <p style={{ color: "red" }}>{error_msg}</p>
                                           )}
                                         </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                            <p class="form-row form-group user-role vendor-customer-registration">
<label class="radio"> <input type="checkbox" onChange={setAdminChk} value="seller"/> Admin </label>

</p>
                                            </div>
                                        </div>
                                           
                                        <span className="btn btn-primary btn-block text-white btn-user"  onClick={()=>handleSave()}>Login</span>
                                        <hr></hr>
                                    </form>
                                    <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                                    <div className="text-center"><a className="small" href="/register">Create an Account!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
                            </div>
                </div>
            </div>
        </div>
    </div>
            </div> 
        </section>
 </div>
 } 
   <Footer/>
   </React.Fragment> 
        );
    }

export default Welcome;