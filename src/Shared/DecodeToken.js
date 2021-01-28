import jwt from "jsonwebtoken";

import store from "../Store";

let verifyKey;

export const decodeToken = token => {
  const state = store.getState();
  if (state.config.jwtPublicKey) {
    if (!verifyKey) {
      verifyKey = atob(state.config.jwtPublicKey);
    }

    return jwt.verify(token, verifyKey);
  } else {
    return jwt.decode(token);
  }
};
