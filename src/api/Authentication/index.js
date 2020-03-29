import ApiBase from "src/api/ApiBase";
import axios from 'axios'
import {LOGIN_URL, REVOKE_TOKEN_URL} from 'src/api/ApiConstants'

class AuthenticationApi extends ApiBase {

    async authenticate(username, password){
        return await axios({
            method: 'post',
            url: this.api_base_url + LOGIN_URL,
            headers: this.headers(),
            data:{
                username: username, 
                password: password
            }
        })
        .then(this.successCallback)
        .catch(this.errorCallback);
    }

    async revoke(){
        let authentication = this.getAuth()
        return await axios({
            method: 'post',
            url: this.api_base_url + REVOKE_TOKEN_URL,
            headers: this.headers(),
            data:{
                token: authentication.access_token
            }
        }).then(this.successCallback)
        .catch(this.errorCallback);
    }
}
export default AuthenticationApi;