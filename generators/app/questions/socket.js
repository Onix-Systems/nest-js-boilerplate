module.exports = {
  jwt: [
    {
      type: 'list',
      name: 'wantedSocket',
      message: 'Do you want to use web sockets?',
      default: 'Yes',
      choices: ['Yes', 'No'],
    },
  ],
  oauth2: [],
  passportLocal: [],
};
