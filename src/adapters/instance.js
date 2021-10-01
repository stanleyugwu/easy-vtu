import axios from 'axios';
import store from '../store/index';

const instance = axios.create({
    baseURL:'https://easyvtu.herokuapp.com',
    timeout:8000,
    timeoutErrorMessage:'The request took too long to satisfy',
    // headers:{
    //     common:{
    //         'Content-Type':'multipart/form-data'
    //     }
    // }
});

//Request interceptor to append Authorization header if user is logged in
instance.interceptors.request.use((config) => {
    // console.log(config)
    const token = store.getState().user.accessToken;
    if(token){
        config.headers['Authorization'] = `${token}`;
    }
    return config
});


/**
 * The response interceptor below is configured in a way to make error response body 
 * remain the same for both server error responses and client request errors
 * e.g there's always a `message` key in the error object thrown to functions making requests.
 * and this key contains user-friendly error message as string, so it can be shown to user directly.
 * the same is for connection and timeout errors, they have a `message` key to tell what happened.
 * error objects also have `_error` key which has all the technical details about the error
 */
const okayStatuses = [200,201,202,203,204,205,206,207,208,226,];
instance.interceptors.response.use((response) => {
    response.OK = (okayStatuses.includes(response.status));
    
    /** reject if server responded with 2xx but response.body.status is false */
    if(response.data.status == false) return Promise.reject(response.data)

    return response
}, (error) => {

    //server responded with error, return server response body
    if(error.response){
        //join all errors into multi-line string if they arrive in objects and arrays
        if(error.response.data.message && typeof error.response.data.message == 'object'){
            let errorMessage = error.response.data.message;

            //get all the error arrays, flatten the array, and join the items with newline
            let transformedMessage = Object.values(errorMessage).flat(4).join('\n');

            let transormedError = {
                ...error.response.data,
                message:transformedMessage,//override message key with formatted error
                _error:error.response
            };

            return Promise.reject(transormedError)
        }
        return Promise.reject({...error.response.data,_error:error.response})
    }
    //Network Connection or Timeout Errors (mock server error response)
    else if(error.request){
        return Promise.reject({
            status:false, 
            message:`Request Failed!, Make Sure You're Connected To Internet`,
            _error:error.request
        })
    }
    //Request Config Error (mock server error response)
    else return Promise.reject({
        status:false,
        message:'Network Error!, Check Your Internet Connection',
        _error:error.request
    })
})

export default instance;