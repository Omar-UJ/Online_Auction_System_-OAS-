import Configuration from "../Configuration/Configuration";
import Axios from "./axios-servies"; 
const axios = new Axios();
  export default class PayServices {
            ChkBidPayment(data){
                return axios.post(Configuration.ChkBidPayment,data,false);
            }        
            PayBidPayment(data){
              return axios.post(Configuration.PayBidPayment,data,false);
          }
          PayProPayment(data){
              return axios.post(Configuration.PayProPayment,data,false);
          } 
          PayPremiumPayment(data){
              return axios.post(Configuration.PayPremiumPayment,data,false);
          } 
}