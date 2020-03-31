import ApiBase from "src/api/ApiBase";
import {USERS_URL, RESET_PASSWORD_URL, 
        USERS_ME_URL, USERS_CHANGE_PASSWORD_URL, USERS_WIDGETS_URL} from 'src/api/ApiConstants'

class UsersApi extends ApiBase {

    async create(data){
        let request = {
                method: 'post',
                url: this.api_namespaced_url + USERS_URL,
                headers: this.headers(),
                data: {
                    user: data
                }
        }
        return await this.sendRequest(request)
    }

    async my_widgets(term=""){
        let request = {
            method: 'get',
            url: this.api_namespaced_url + USERS_WIDGETS_URL,
            headers: this.headers()
        }
        if(term !== ""){
            request.params = { term: term }
        }   
        return await this.sendRequest(request)
    }

    async update(data){
        console.log(data)
        let request = {
            method: 'put',
            url: this.api_namespaced_url + USERS_ME_URL,
            headers: this.headers(),
            data: {
                user: data
            }
        }
        return await this.sendRequest(request)
    }

    async update_password(current_password, new_password){
        let request = {
            method: 'post',
            url: this.api_namespaced_url + USERS_CHANGE_PASSWORD_URL,
            headers: this.headers(),
            data: {
                user: {
                    current_password: current_password,
                    new_password: new_password
                }
            }
        }
        return await this.sendRequest(request);
    }

    async forgotPassword(email){
        let request = {
            method: 'post',
            url: this.api_namespaced_url + RESET_PASSWORD_URL,
            headers: this.headers(),
            data: {
                user: {
                    email: email
                }
            }
        }
        return await this.sendRequest(request);
    }

    async show(id){
        let request = {
            method: 'get',
            url: this.api_namespaced_url + USERS_URL + "/" + id,
            headers: this.headers()
        }
        return await this.sendRequest(request);
    }

    async me(){
        let request = {
            method: 'get',
            url: this.api_namespaced_url + USERS_ME_URL,
            headers: this.headers()
        }
        return await this.sendRequest(request);
    }
    
    // async update(data){
    //     let request = {
    //         method: 'put',
    //         url: this.api_namespaced_url + USERS_URL,
    //         headers: this.headers(),
    //         data: data
    //     }
    //     return await this.sendRequest(request)
    // }
}

export default UsersApi;