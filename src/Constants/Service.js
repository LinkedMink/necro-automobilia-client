export const Services = {
  SELF: "",
  USER: "user",
  NECRO_AUTOMOBILIA: "necroAutomobilia",
}

export const Routes = {
  [Services.SELF]: {
    CONFIG: 'config',
  },
  [Services.USER]: {
    ACCOUNT: 'account',
    AUTHENTICATE: 'authenticate',
    PASSWORD: 'password',
    REGISTER: 'register',
    SETTINGS: 'settings',
  },
  [Services.NECRO_AUTOMOBILIA]: {
    ACCIDENTS: 'accidents',
    FEED_EVENTS: 'feed-events',
    ROUTES: 'routes',
  },
}

export const ResponseCodes = {
  SUCCESS: 0,
  FAILED: 1,
  REQUEST_VALIDATION: 10,
  DATA_VALIDATION: 11,
}
