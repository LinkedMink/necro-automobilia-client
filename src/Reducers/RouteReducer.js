import { SAVE_ACTIVE_ROUTE } from '../Actions/RouteAction';

const routeReducer = (state = {}, action) => {
  if (action.type === SAVE_ACTIVE_ROUTE) {
    return Object.assign({}, state, { activeRoute: action.payload });
  } else {
    return state;
  }
}

export default routeReducer;
