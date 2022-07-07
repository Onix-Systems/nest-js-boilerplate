module.exports = {
  Mongodb: {
    jwt: [
      {
        type: 'list',
        name: 'wantedAdminPanel',
        message: 'Do you want to have an admin panel?',
        default: 'No',
        choices: ['Yes', 'No'],
      }
    ],
    oauth2: [],
    passportLocal: [
      {
        type: 'list',
        name: 'wantedAdminPanel',
        message: 'Do you want to have an admin panel?',
        default: 'No',
        choices: ['Yes', 'No'],
      }
    ],
  },

  Mysql: {
    jwt: [],
    oauth2: [],
    passportLocal: [],
  },

  Postgresql: {
    jwt: [],
    oauth2: [],
    passportLocal: [],
  },
}
