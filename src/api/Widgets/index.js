import ApiBase from "src/api/ApiBase";
import {VISIBLE_WIDGETS_URL} from 'src/api/ApiConstants'

class WidgetsApi extends ApiBase {

    async visible(term=""){
        console.log("Executed with term:" + term)
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
}

export default WidgetsApi;