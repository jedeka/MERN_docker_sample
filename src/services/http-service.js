import 'whatwg-fetch';

class HttpService {
    getProducts = () => {
        // fetching data after querying API 
        // what is actually running 
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3004/product')
            .then(response => {
                // resolve promise and return response in json format
                resolve(response.json());
                
                // can use reject() for the catch part
            });
        })

        return promise;
    }
}

export default HttpService;