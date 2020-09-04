module.exports = {
  oauth2: [
    {
      type: 'input',
      name: 'oauth2ClientId',
      message: 'Type your google oauth2 client id token',
      default: '',
    },
    {
      type: 'input',
      name: 'oauth2ClientSecret',
      message: 'Type your google oauth2 client secret token',
      default: '',
    },
    {
      type: 'input',
      name: 'oauth2CallbackUrl',
      message: 'Type your google oauth2 callback url',
      default: 'http://localhost:3000/google/redirect',
    },
  ],
  jwt: [],
  passportLocal: [],
};