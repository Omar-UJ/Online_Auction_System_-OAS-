import React,{useState}  from "react"
import Nav from "../pages/nav"
import Footer from"../pages/footer"
import { useNavigate } from "react-router-dom";
import ClientServices from "../Services/client-services";
const clientService = new ClientServices();
const pnumregex = /^0[1-9]\d{8}$/;

<style jsx>{`.is-invalid {
            border-color: red;
            color: red;
            background-color: #ffe7e7;
            padding: 0.375rem 0.75rem;
            border-radius: 0.25rem;
          }
     `}</style>
     
function Register(){
    const navigate = useNavigate();
        
        const [fname,setFName] = useState('');
        const [lname,setLName] = useState('');
        const [email,setEmail] = useState('');
        const [pnumber,setpnumber] = useState('');
        const [DOB,setDOB] = useState('');
        const [password,setPassword] = useState('');
        const [repassword,setRePassword] = useState('');
        const [errorMessage, setErrorMessage] = useState("");
        const [error, setError] = useState(0);
        const handleFNameChange = (value)=>{
            setFName(value);
        }
        const handleLNameChange = (value)=>{
            setLName(value);
        }
         const handleDOB = (value)=>{
            setDOB(value);
        }
        const handleEmailChange = (value)=>{
            setEmail(value);
        }
        const handlePasswordChange = (value)=>{
            setPassword(value);
        }
        const handleRePasswordChange = (value)=>{
            setRePassword(value);
        }
        const handlePhoneChange = (value)=>{
            setpnumber(value);
        }
        const handleRegistration = ()=>{

                            if(fname===''|lname===''){
                                setErrorMessage("Fill the form properly !");
                                setError(0);
                            }else if(email==='' ||!email.includes("@")){
                                setErrorMessage("Invalid Email Address")
                                setError(1);
                            }else if(!pnumregex.test(pnumber)){
                                setErrorMessage("Phone number not valid !");
                                setError(2);
                            }else if(password!==repassword){
                                setErrorMessage("Password does not match !");
                                setError(3);
                            }else if(password.length<8){
                                setErrorMessage("Password should be 8-20 characters or include at least 1 letter, 1 number and 1 special character! !");
                                setError(4);
                            }
                            else{
                                const data = {
                               first_name:fname,
                               last_name:lname,
                               email:email,
                               telephone:pnumber,
                               password:password,
                               dob:DOB
                           } 
                           clientService.RegisterClient(data).then((data)=>{
                              
                               setErrorMessage(data);
                               navigate("/",{
                                   state:{
                                   }
                               });
                           }).catch((error)=>{
                               setErrorMessage("An error occured");
                           });
                       }
 
            }
        return(
       <div>
            <div className="bg-gradient-primary"><Nav/>
            <div className="container" style={{marginTop:"70px"}}>
            <div class="inner-banner">
            <div class="container" style={{marginTop:"50px"}}>
                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Register                </h2>
            </div>
        </div>
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-register-image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg/png/breadcrumb.png)`}}></div>
                   </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <form className="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input
                          className={`form-control form-control-user ${
                            errorMessage && error===0 && "is-invalid"
                          }`} type="text"  id="exampleFirstName" placeholder="First Name" name="first_name" onChange={(e)=>handleFNameChange(e.target.value)}/></div>
                                    <div className="col-sm-6"><input
                          className={`form-control form-control-user ${
                            errorMessage && error===0 && "is-invalid"
                          }`} type="text" id="exampleFirstName" placeholder="Last Name" name="last_name" onChange={(e)=>handleLNameChange(e.target.value)}/></div>
                                </div>
                                <div className="form-group"><input
                        className={`form-control form-control-user ${
                          errorMessage && error===1 && "is-invalid"
                                             }`} type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" onChange={(e)=>handleEmailChange(e.target.value)}/></div>
                               <div className="form-group">
                                <div className="col-sm-6 mb-3 mb-sm-0"> 
                                Date of birth 
                                    </div>
                                       <input
                        className={`form-control form-control-user ${
                          errorMessage && error===2 && "is-invalid"
                        }`} type="date" id="exampleInputEmail" aria-describedby="dobHelp" placeholder="Date of birth" name="dob" onChange={(e)=>handleDOB(e.target.value)}/></div>
                                <div className="form-group">   <input
                        className={`form-control form-control-user ${
                          errorMessage && error===2 && "is-invalid"
                        }`} type="number" id="exampleInputEmail" aria-describedby="pnumberHelp" placeholder="Phone Number" name="phone" onChange={(e)=>handlePhoneChange(e.target.value)}/></div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0"><input
                          className={`form-control form-control-user ${
                            errorMessage && error=== 3|4 && "is-invalid"
                          }`} type="password" id="examplePasswordInput" placeholder="Password" name="password" onChange={(e)=>handleRePasswordChange(e.target.value)}/></div>
                                    <div className="col-sm-6"><input
                          className={`form-control form-control-user ${
                            errorMessage && error=== 3|4  && "is-invalid"
                          }`} type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" onChange={(e)=>handlePasswordChange(e.target.value)}/></div>
                            
                                    <div>
                                           {errorMessage !== "" && ( <p style={{ color: "red"  }}>{errorMessage}</p>  )}
                                         </div>

                                         <div class="text-dark mb-4">
                                            <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our  
                                                <a href="../privacy-policy/index.html" class="woocommerce-privacy-policy-link" target="_blank">
                                                     privacy policy</a>.</p></div>

                                </div><span className="btn btn-primary btn-block text-white btn-user"  onClick={()=>handleRegistration()}>Register Account</span>
                               
                            </form>
                            <div className="text-center"><a className="small" href="/">Already have an account? Login!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
            </div>
             <Footer/>
            </div>
            
        )
    }

export default Register;