export const Service = {
  SELF: "",
  USER: "user",
  NECRO_AUTOMOBILIA: "necroAutomobilia",
}

export const Routes = {
  [Service.SELF]: {
    CONFIG: 'config',
  },
  [Service.USER]: {
    ACCOUNT: 'account',
    AUTHENTICATE: 'authenticate',
    PASSWORD: 'password',
    REGISTER: 'register',
    SETTINGS: 'settings',
  },
  [Service.NECRO_AUTOMOBILIA]: {
    ACCIDENTS: 'accidents',
    FEED_EVENTS: 'feed-events',
    ROUTES: 'routes',
  },
}
