import Configuration from "../Configuration/Configuration";
import Axios from "./axios-servies"; 
const axios = new Axios();

  export default class ClientServices {
            chkConn(){ 
              const msg = true;
              axios.get(Configuration.chkConn).then((result)=>{
                if(result.data==true)msg=true;
                else msg = false;
              }).catch((error)=>{
                msg = false;
              })
              return  msg;
            }
            RegisterClient(data){
                return axios.post(Configuration.RegisterClient,data,false);
            }
            GetClient(data){
              return axios.post(Configuration.GetClient,data,false);
          } 
            GetClientInfo(data){
              return axios.post(Configuration.GetClientInfo,data);
          }
          SetAddress(data){
            return axios.post(Configuration.SetClientAddress,data,false);
          } 
          DeactivateAccount(data){
            return axios.post(Configuration.DeactivateAccount,data);
          } 
          UpdateClientInfo(formdata){
           return fetch(Configuration.UpdateClientInfo,{
              method: 'POST',
              body: formdata
            })
          }      
}