module.exports = {
  jwt: [
    {
      type: 'list',
      name: 'wantedSocket',
      message: 'Do you want to use web sockets?',
      default: 'No',
      choices: ['Yes', 'No'],
    },
  ],
  oauth2: [],
  passportLocal: [],
};
