import Configuration from "../Configuration/Configuration";
import Axios from "./axios-servies"; 
const axios = new Axios();

  export default class NotficationServices {
           
        GetNotf(data){
              return axios.post(Configuration.GetNotf,data);
          }
          GetTopNotf(data){
            return axios.post(Configuration.GetTopNotf,data);
        }
        SetNotf(data){
            return axios.post(Configuration.SetNotf,data);
          } 
             
}