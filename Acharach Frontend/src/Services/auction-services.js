import Configuration from "../Configuration/Configuration";
import Axios from "./axios-servies"; 
const axios = new Axios();

  export default class AuctionServices {
            
          AddItem(data){
              return axios.post(Configuration.AddItem,data,false);
          }
          GetAuction(data){
            return axios.post(Configuration.GetAuction,data);
          }
          GetSelectedAuction(id){
            return axios.post(Configuration.GetSelectedAuction,id);
          }
          SetBid(data){
            return axios.post(Configuration.SetBid,data);
          }
          GetMyBid(data){
            return axios.post(Configuration.GetMyBid,data);
          }
          UpdateAuctionInfo(data){
            return axios.post(Configuration.UpdateAuctionInfo,data);
          }
          IncView(data){
            return axios.post(Configuration.IncView,data);
          } 
          getLivePrice(data){
            return axios.post(Configuration.getLivePrice,data);
          }
          getClosedPrice(data){
            return axios.post(Configuration.getClosedPrice,data);
          }
          IncRate(data){
            return axios.post(Configuration.IncRate,data);
          }

          //Search
           SearchAuction(data){
            return axios.post(Configuration.SearchAuction,data);
          }

          //GetCategory
          GetCategory(){
            return axios.get(Configuration.GetCategory);
          }

          //Get Winner
          GetOpenWinner(data){
            return axios.post(Configuration.GetOpenWinner,data);
          }
}