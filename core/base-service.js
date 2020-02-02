export default class BaseService{
    ENDPOINT = null;
    authToken = null;

    // TODO appennd authtoken to all the requests.. when not null
    setAuthToken(token){
        this.authToken = token;
    }

    clearAuthToken(){
        this.authToken = null;
    }

    async put(url, data){
        const options = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        return await this.doRequest(url, options);
    }

    async patch(url, data){
        const options = {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        return await this.doRequest(url, options);
    }

    async post(url, data){
        const options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        return await this.doRequest(url, options);
    }

    async delete(url){
        const options = {
            method: 'DELETE'
        }

        return await this.doRequest(url, options);
    }

    async doRequest(uri, options){
        try {
            let response = await fetch(`${this.ENDPOINT}${uri}`, options);
            let responseData = await this.processResponse(response);

            console.log("fetch response data:", responseData);

            return responseData;
        } catch(e) {
            console.error("Service failed:", e.message);

            return {
                type: 'error',
                message: e.message
            }
        }
    }

    async processResponse(response){
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return await response.json();
        } else {
          return await response.text();
        }
    }
}