import axios, { AxiosError, AxiosResponse } from "axios";
import store from "../store/index";
import { Server } from "../types";

const myAxios = axios.create({
  baseURL: "https://cb0588d5-3fd7-48d7-a675-9b494486c500.mock.pstmn.io",//https://easy-vtu.herokuapp.com",
  timeout: 8000,
  timeoutErrorMessage: "The request took too long to satisfy",
});

//Request interceptor to append Authorization header if user is logged in
myAxios.interceptors.request.use((config) => {
  // console.log(config)
  const token = store.getState().user?.accessToken;
  if (token && config.headers) {
    config.headers["Authorization"] = `${token}`; // token from store wil have `Bearer ` prefix
  }
  return config;
});

/**
 * The response interceptor below is configured in a way to make error response body
 * remain the same for both server error responses and client request errors
 * There's always a `message` key in the error object thrown to functions making requests
 * and this key contains user-friendly error message as string, so it can be shown to user directly.
 * the same is for connection and timeout errors, they have a `message` key to tell what happened.
 * error objects also have `_error` key which has all the technical details about the error.
 * *Note*: We're rejecting all errors explicitly, if not the error will be caught in `then` of caller instead of in `catch`
 */
myAxios.interceptors.response.use(
  (response:AxiosResponse<Server.Response>) => {
    /** reject if server responded with 2xx but response.body.status is false */
    if (response.data?.status == false)
      return Promise.reject({
        message:
          response.data?.message ||
          "Sorry!, an error occured. Please try again",
        _error: response.data,
      });

    return response;
  },
  /**
   * At all instances of error, we make sure we return error of type `RequestError` to the caller
   */
  (
    error: AxiosError<Server.ErrorResponse>
  ): Promise<Server.RequestError> => {
    //we made request, but server responded with error, return server response body
    if (error.response) {
      //transform Internal Server Error to friendlier message
      if (error.response.status == 500) {
        return Promise.reject({
          message: `An error occured on our side, please try again. Report to us if the problem persists`,
          _error: error.response,
        });
      }

      // Because we must make any returned error match `RequestError` type,
      // we join all error messages into single string with newline (`\n`) character seperating each message
      // if they arrive as objects or arrays from server
      let errorMsgFrmServer = error.response.data?.message;
      if (errorMsgFrmServer && errorMsgFrmServer instanceof Object) {
        //get all the error arrays, flatten the array, and join the items with newline
        let transformedErrorMessage = Object.values(errorMsgFrmServer)
          .flat(4)
          .join("\n");

        let transormedError = {
          message: transformedErrorMessage, //override message key with formatted error
          _error: error.response,
        };

        return Promise.reject(transormedError);
      }

      // error message is not an object or error returned from server mismatch the expected
      // error or error message is a string (as expected)
      // Note: we're falling back to a default error message incase server response doesn't have `message` field
      return Promise.reject({
        message:
          error.response.data?.message ||
          "Sorry!, an error occured. Please try again",
        _error: error.response,
      });
    }

    //request wasn't made because of Network Connection or Timeout Errors
    // we'll make sure error returned to caller is `RequestError` type
    else if (error.request && !error.response) {
      return Promise.reject({
        message: `Request Failed!, Make Sure You're Connected To Internet`,
        _error: error.request,
      });
    }
    //Request Cancelled
    else if (axios.isCancel(error)) {
      return Promise.reject({
        message: error.message || "Request Cancelled. Please try again",
        _error: error,
      });
    }
    //Request Config Error
    else
      return Promise.reject({
        message: "Network Error!, Check Your Internet Connection",
        _error: error.request || error.message,
      });
  }
);

export default myAxios;
