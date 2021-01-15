module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Application name',
    default: 'my-custom-api',
  },
  {
    type: 'input',
    name: 'serverPort',
    message: 'Server port',
    default: 3000,
  },
  {
    type: 'input',
    name: 'serverHost',
    message: 'Server host',
    default: 'http://localhost',
  },
];
