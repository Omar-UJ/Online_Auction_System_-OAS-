const axios = require('axios').default
export default class AxiosServices{
        post(url,data,header){
            return axios.post(url,data,header);
        }
        get(url){
            return axios.get(url);
        }
        put(url,data){
            return axios.put(url,data);
        }
}
