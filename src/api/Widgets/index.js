import ApiBase from "src/api/ApiBase";
import {VISIBLE_WIDGETS_URL, WIDGETS_URL} from 'src/api/ApiConstants'

class WidgetsApi extends ApiBase {

    async visible(term=""){
        let request = {
                method: 'get',
                url: this.api_namespaced_url + VISIBLE_WIDGETS_URL,
                headers: this.headers()
        }

        if(term !== ""){
            request.params = { term: term }
        }   
        return await this.sendRequest(request)
    }

    async index(){
        let request = {
            method: 'get',
            url: this.api_namespaced_url + WIDGETS_URL,
            headers: this.headers()
        }
        return await this.sendRequest(request);
    }

    async destroy(id){
        let request = {
            method: 'delete',
            headers: this.headers(),
            url: this.api_namespaced_url + WIDGETS_URL + "/" + id
        }
        return await this.sendRequest(request);
    }

    async create(data){
        let request = {
            method: 'post',
            url: this.api_namespaced_url + WIDGETS_URL,
            headers: this.headers(),
            data: {
                widget: data
            }
        }
        return await this.sendRequest(request);
    }
}

export default WidgetsApi;