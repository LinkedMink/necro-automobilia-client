import jwt from "jsonwebtoken"

import store from "../Store";

export const decodeToken = (token) => {
  const state = store.getState();
  if (state.config.jwtPublicKey) {
    return jwt.verify(token, state.config.jwtPublicKey);
  } else {
    return jwt.decode(token);
  }
}