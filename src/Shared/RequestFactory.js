import urlJoin from "url-join";

import store from "../Store";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingEnd } from "../Actions/Loading";

class RequestFactory {
  static getHeaders(isAuthorized = true) {
    let headers = { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    if (isAuthorized) {
      const state = store.getState();
      if (state.account.token) {
        headers['Authorization'] = `Bearer ${state.account.token}`
      }
    }

    return headers;
  }

  static getGetOptions(isAuthorized = true) {
    let headers = RequestFactory.getHeaders(isAuthorized);

    return {
      method: 'GET',
      headers: headers,
    };
  }

  static getPostOptions(requestData = {}, isAuthorized = true) {
    let headers = RequestFactory.getHeaders(isAuthorized);

    return {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    };
  }

  static getRequestUrl(targetService, pathQuery) {
    const state = store.getState();
    if (state.config[targetService]) {
      return urlJoin(state.config[targetService], pathQuery);
    } else {
      return pathQuery;
    }
  }

  static getJsonResponse(dispatch, targetService, pathQuery, requestSuccessFunc, isPost = false, requestData = {}, isAuthorized = true) {
    let url = RequestFactory.getRequestUrl(targetService, pathQuery);

    let options = null;
    if (isPost) {
      options = RequestFactory.getPostOptions(requestData, isAuthorized);
    } else {
      options = RequestFactory.getGetOptions(requestData, isAuthorized);
    }

    dispatch(loadingStart())

    return fetch(url, options)
      .then(response => RequestFactory.handleRawResponse(dispatch, response))
      .then(json => RequestFactory.handleServiceResponse(dispatch, json, requestSuccessFunc))
      .catch(error => RequestFactory.handleGenericCatch(dispatch, error));
  }

  static handleRawResponse(dispatch, response) {
    if (!response.ok) {
      dispatch(alertError(`${response.status} : ${response.statusText}`));
      return Promise.resolve(null);
    }

    return response.json();
  }

  static handleServiceResponse(dispatch, json, requestSuccessFunc) {
    if (json && json.code === 0) {
      dispatch(requestSuccessFunc(json.data));
    } else if (json && json.code) {
      dispatch(alertError(`${json.code} : ${json.description} : ${json.errors}`));
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

export default RequestFactory;