import urlJoin from "url-join";

import store from "../Store";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingEnd } from "../Actions/Loading";

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export class RequestFactory {
  static getOptions(method = HttpMethods.GET, requestData = null, isAuthorized = true) {
    const headers = { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    if (isAuthorized) {
      const state = store.getState();
      if (state.account.token) {
        headers['Authorization'] = `Bearer ${state.account.token}`
      }
    }

    const options = {
      method: method,
      headers: headers,
    };

    if (requestData) {
      options.body = JSON.stringify(requestData)
    }

    return options
  }

  static getRequestUrl(targetService, pathQuery) {
    const state = store.getState();
    if (state.config[targetService]) {
      return urlJoin(state.config[targetService], pathQuery);
    } else {
      return pathQuery;
    }
  }

  static getJsonResponse(dispatch, targetService, pathQuery, requestSuccessFunc, method = HttpMethods.GET, requestData = null, isAuthorized = true) {
    const url = RequestFactory.getRequestUrl(targetService, pathQuery);
    const options = RequestFactory.getOptions(method, requestData, isAuthorized);

    dispatch(loadingStart())

    return fetch(url, options)
      .then(response => RequestFactory.handleRawResponse(dispatch, response))
      .then(json => RequestFactory.handleServiceResponse(dispatch, json, requestSuccessFunc))
      .catch(error => RequestFactory.handleGenericCatch(dispatch, error));
  }

  static handleRawResponse(dispatch, response) {
    if (!response.status === 500) {
      dispatch(alertError(`${response.status} : ${response.statusText}`));
      return Promise.resolve(null);
    }

    return response.json();
  }

  static handleServiceResponse(dispatch, json, requestSuccessFunc) {
    if (json && json.status === 0) {
      dispatch(requestSuccessFunc(json.data));
    } else if (json && json.status === 1) {
      dispatch(alertError(json.data));
    } else if (json) {
      dispatch(requestSuccessFunc(json));
    }

    dispatch(loadingEnd())
  }

  static handleGenericCatch(dispatch, error) {
    dispatch(loadingEnd());
    dispatch(alertError(error.message));
  }
}
