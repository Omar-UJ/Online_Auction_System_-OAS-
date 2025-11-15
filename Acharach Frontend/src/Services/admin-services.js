import Configuration from "../Configuration/Configuration";
import Axios from "./axios-servies"; 
const axios = new Axios();

  export default class AdminServices {
            GetClients(){
              return axios.get(Configuration.GetClients);
          }

          GetAdmin(data){
            return axios.post(Configuration.GetAdmin,data,false);
        } 

        ActivateClient(data){
          return axios.post(Configuration.ActivateClient,data,false);
      } 
      DeactivateClient(data){
        return axios.post(Configuration.DeactivateClient,data,false);
    } 
    SearchClient(data){
      return axios.post(Configuration.SearchClient,data);
    }

}