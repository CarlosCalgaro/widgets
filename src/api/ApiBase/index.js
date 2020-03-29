// import {store} from 'store/store';
import {BASE_URL, V1_PREFIX} from 'src/api/ApiConstants'

import {toast} from 'react-toastify'
import {store} from 'src/store'
import axios from 'axios'
class ApiBase{

    constructor(){
        this.store = store;
        this.api_base_url = BASE_URL;
        this.api_namespaced_url = BASE_URL + V1_PREFIX
    }
    
    getAuth(){
        let state = this.store.getState()
        return state.authentication
    }

    async sendRequest(params){
        return await axios(params).then(this.successCallback).catch(this.errorCallback)
    }

    headers(){
        let authentication = this.getAuth();
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        if(authentication.access_token !== ""){
            headers['Authorization'] = 'Bearer ' + authentication.access_token
        }
        return headers
    }

    successCallback(response){
        return { 
            success: true,
            body: response.data
        }
    }

    errorCallback(error){
        let body = null
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            body = error.response.data
          } else if (error.request) {
            toast.error("Connection Problem! Please try again later")
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          return {
              success: false,
              body: body
          }
    }
}



export default ApiBase;