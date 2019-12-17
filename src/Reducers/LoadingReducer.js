import { LOADING_START, LOADING_REPORT, LOADING_END } from '../Actions/LoadingAction';

const loadingReducer = (state = {}, action) => {
  if (action.type === LOADING_START) {
    if (state && state.isLoading) {
      return state;
    }

    return Object.assign({}, state, { 
      isLoading: true, 
      percentComplete: action.payload.isProgressable ? 0 : undefined,
      message: action.payload.message
    });
  } 
  else if (action.type === LOADING_REPORT) {
    let copyState = Object.assign({}, state);
    copyState.percentComplete = action.payload;
    return copyState;
  } else if (action.type === LOADING_END) {
    return Object.assign({}, state, { 
      isLoading: false,
      percentComplete: undefined
    });
  } else {
    return state;
  }
}

export default loadingReducer;
