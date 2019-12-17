export const Service = {
  SELF: "",
  USER: "user",
  NECRO_AUTOMOBILIA: "necroAutomobilia",
}

export const Routes = {
  [Service.SELF]: {
    CONFIG: '',
  },
  [Service.USER]: {
    ACCOUNT: 'account',
    AUTHENTICATE: 'authenticate',
    PASSWORD: 'password',
    REGISTER: 'register',
  },
  [Service.NECRO_AUTOMOBILIA]: {
    ACCIDENTS: 'accidents',
    FEED_EVENTS: 'feed-events',
    ROUTES: 'routes',
  },
}
