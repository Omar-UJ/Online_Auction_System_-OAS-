import React,{useState,useEffect} from "react"
import Nav from "./c_header"
import Footer from"./c_footer"
import ClientServices from "../../Services/client-services"
import Account from "../../Components/Account"

const clientServices = new ClientServices();
function ClientProfile(){ 
    const[city,setCity] = useState('');
    const[country,setCountry] = useState('');
    const[street,setStreet] = useState('');
    const[zipCode,setZipCode] = useState('');
    const[first_name,setFName] = useState('');
    const[last_name,setLName] = useState('');
    const[picture,setPicture] = useState('');
    const[data,setData] = useState('');
    const[displayItemPic,setDisplayPic] = useState();
//variables with methods used to set data into it
//used to set the value of user in to inputs
useEffect(()=>{
    update();
 },[]);
   const lnameSave = (e)=>{
        setLName(e);
    }
   const fnameSave = (e)=>{
        setFName(e);
    }
    const picSave = (e)=>{
        setPicture(e.target.files[0]);
        setDisplayPic(URL.createObjectURL(e.target.files[0]))
    }
    const cityChange = (e)=>{
        setCity(e);
    }
    const countryChange = (e)=>{
        setCountry(e);
    }
    const streetChange = (e)=>{
        setStreet(e);
    }
    const zipCodeChange = (e)=>{
        setZipCode(e);
    }
    const handleDeleteAccount = ()=>{
        const user = {
            email:sessionStorage.getItem("email")
        }
        //pass data to the api
    clientServices.DeactivateAccount(user).then((result)=>{
        alert(result.data.client)
      if(result.data.msg==="SUCCESS")
      {
        sessionStorage.clear();
        sessionStorage.setItem("status","out")
        window.location = "/"
      }
  }).catch((error)=>{
      alert(error);
  });
    }
//used to update the info 
const handleSaveInfo = ()=>{ 
     const formdata = new FormData()

    if(first_name.length===0)formdata.append('first_name',sessionStorage.getItem("first_name"))
    else formdata.append('first_name',first_name)

    if(last_name.length===0)formdata.append('last_name',sessionStorage.getItem("last_name"))
    else formdata.append('last_name',last_name)

    formdata.append('email',sessionStorage.getItem("email"))

    if(picture.length===0)formdata.append('pic', sessionStorage.getItem("profilePic"))
    else formdata.append('pic',picture)
  alert(picture.length)
  formdata.append('pic',picture)
  
//pass data to the api
    clientServices.UpdateClientInfo(formdata).then((result)=>{
           alert(result.ok)
         if(result.data==="SUCCESS")
         {
            update()
         }
     }).catch((error)=>{
         alert(error);
     });
}
 const newAddress = (data )=>{
  
return data;
 }
//used to update the address 
    const handleSaveAddress = ()=>{
   const data = {
            country:country,
            city:city,
            street:street,
            zipCode:zipCode,
            id:sessionStorage.getItem("user_id")
        } 
        if(country.length===0)data.country = sessionStorage.getItem("country")
        else data.city = country;
        if(city.length===0)data.city = sessionStorage.getItem("city")
        else data.city = city;
        if(street.length===0)data.street=sessionStorage.getItem("street")
        else data.street=street;
        if(zipCode.length===0)data.zipCode = sessionStorage.getItem("zipCode")
        else data.zipCode = zipCode
//pass data to the api
        clientServices.SetAddress(newAddress(data)).then((result)=>{
             if(result.data==="Success")update();
         }).catch((error)=>{
             alert(error);
         });
    }
    const update = ()=>{
        const client = {
            email:sessionStorage.getItem("email")
        }
        clientServices.GetClientInfo(client).then((result)=>{
            if(result.data.client!=null){
                setData(result.data.client); 
                setDisplayPic(`data:image/jpg;base64,${result.data.client.profilePic}`)
            sessionStorage.setItem("first_name",result.data.client.first_name)
            sessionStorage.setItem("last_name",result.data.client.last_name)
            sessionStorage.setItem("profilePic",result.data.client.profilePic)

            sessionStorage.setItem("city",result.data.client.city)
            sessionStorage.setItem("address",result.data.client.address)
            sessionStorage.setItem("country",result.data.client.country)
            sessionStorage.setItem("zipCode",result.data.client.zipCode)
            sessionStorage.setItem("street",result.data.client.street)

            }else alert("am here stack with null file")  ;
         }).catch((error)=>{
             alert(error);
         });
    }
        return(
            <React.Fragment> <Nav/>
            {
               <div id="page-top" style={{marginTop:"70px"}}>
    <div id="wrapper">
      
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div class="container">
                <div className="ch-home-title">    <div class="inner-banner ">
<div class="container" style={{marginTop:"50px"}}>




<div class="card-div text-center shadow">
                                    <img class="rounded-circle mb-3 mt-4" src={displayItemPic}  width="160" height="160"/>
                                    <div class="mb-3">
                                    <input class="holder _da visible select" type="file" role="button"  onChange = {picSave} placeholder="Browse"/>
                                        </div>
                                </div>


                <h2 class="inner-banner-title wow fadeInLeft animated" data-wow-duration="1.5s" data-wow-delay=".2s" style={{visibility: "visible", animationDuration: "1.5s", animationDelay: "0.2s"}}>
                Selam {data.first_name}</h2>
            </div>
                        </div>
        </div>
                            <div class="row">
                                <div class="col">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 font-weight-bold">User Settings</p>
                                        </div>
                                        <div class="card-div">
                                   
                                        <form>
                                                <div class="form-row">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="username">
                                                                <strong>User ID </strong>
                                                                </label>
                                                                <input class="form-control" type="text" id="username" value={sessionStorage.getItem("user_id")} name="firstName"/>
                                                                </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="email">
                                                                <strong>Email Address</strong>
                                                                </label>
                                                                <input class="form-control" type="email" id="email"  value={sessionStorage.getItem("email")} name="email"/>
                                                                </div>
                                                    </div>
                                                </div>
                                                <div class="form-row">
                                                    <div class="col">
                                                        <div class="form-group"><label for="first_name"><strong>First Name</strong></label><input class="form-control" placeholder={data.first_name}  onChange={(e)=>fnameSave(e.target.value)} type="text" id="first_name"  name="first_name"/></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-group"><label for="last_name"><strong>Last Name</strong></label><input class="form-control" placeholder={data.last_name}  onChange={(e)=>lnameSave(e.target.value)} type="text" id="last_name"  name="last_name"/></div>
                                                    </div>
                                                </div>
                                                <div class="form-group"><span class="btn btn-primary btn-sm" onClick={()=>handleSaveInfo()}>Save Settings</span></div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="card shadow">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 font-weight-bold">Contact Settings</p>
                                        </div>
                                        <div class="card-div">
                                            <form><div class="form-row">
                                                    <div class="col">
                                                        <div class="form-group"><label for="city"><strong>City</strong></label><input class="form-control" type="text" id="citys" placeholder={data.city} name="city" onChange={(e)=>cityChange(e.target.value)}/></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-group"><label for="country"><strong>Country</strong></label><input class="form-control" type="text" id="countrys" placeholder={data.country} onChange={(e)=>countryChange(e.target.value)} name="countrys"/></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-group"><label for="country"><strong>ZipCode</strong></label><input class="form-control" type="text" id="zipCodes" placeholder={data.zipCode} onChange={(e)=>zipCodeChange(e.target.value)}/></div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="address"><strong>Street</strong></label><input class="form-control" type="text" id="address" placeholder={data.street} name="streets" onChange={(e)=>streetChange(e.target.value)}/></div>
                                                
                                                
                                                <div class="form-group"><span class="btn btn-primary btn-sm"  onClick={()=>handleSaveAddress()}>Save&nbsp;Settings</span></div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="card shadow">
                                    <div class="card-header py-3">
                                    <h6 class="text-primary font-weight-bold m-0">Projects</h6>
                                </div>
                                          {Account(sessionStorage.getItem("account_status"))}
                                          <div class="form-group"><span class="btn btn-primary btn-sm"  onClick={()=>handleDeleteAccount()}>Delete&nbsp;Account</span></div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
         
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
</div>  
            }
     
      <Footer/> </React.Fragment>
   );
    }
export default ClientProfile;