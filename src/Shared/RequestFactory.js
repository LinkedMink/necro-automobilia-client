import urlJoin from "url-join";

import store from "../Store";
import { alertError } from "../Actions/Alert";
import { loadingStart, loadingEnd } from "../Actions/Loading";
import { LogService } from "../Shared/LogService";

const GENERIC_REQUEST_ERROR = "An error occurred while processing your request. If the problem persist, contact the administrator."

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

const logger = LogService.getInstance("RequestFactory");

const getOptions = (method = HttpMethods.GET, requestData = null, isAuthorized = true) => {
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

const getRequestUrl = (targetService, pathQuery) => {
  const state = store.getState();
  if (state.config[targetService]) {
    return urlJoin(state.config[targetService], pathQuery);
  } else {
    return pathQuery;
  }
}

const handleRawResponse = (dispatch, url, options) => {
  return (response) => {
    if (response.status === 500) {
      logger.error({
        url,
        verb: options.method, 
        body: options.body,
        response: `${response.status}: ${response.body}`,
      });
      dispatch(alertError(GENERIC_REQUEST_ERROR));
      return Promise.resolve(null);
    }

    return response.json();
  }
}

const handleServiceResponse = (dispatch, requestSuccessFunc) => {
  return (json) => {
    if (json && json.status === 0) {
      dispatch(requestSuccessFunc(json.data));
    } else if (json && json.status === 1) {
      dispatch(alertError(json.data));
    } else if (json) {
      dispatch(requestSuccessFunc(json));
    }

    dispatch(loadingEnd())
  }
}

const handleGenericCatch = (dispatch, url, options) => {
  return (error) => {
    logger.error({ url, verb: options.method, body: options.body, error });
    dispatch(loadingEnd());
    dispatch(alertError(GENERIC_REQUEST_ERROR));
  }
}

export const getJsonResponse = (
  dispatch, targetService, pathQuery, requestSuccessFunc, method = HttpMethods.GET, requestData = null, isAuthorized = true) => {
    
  const url = getRequestUrl(targetService, pathQuery);
  const options = getOptions(method, requestData, isAuthorized);

  dispatch(loadingStart())

  return fetch(url, options)
    .then(handleRawResponse(dispatch, url, options))
    .then(handleServiceResponse(dispatch, requestSuccessFunc))
    .catch(handleGenericCatch(dispatch, url, options));
}
