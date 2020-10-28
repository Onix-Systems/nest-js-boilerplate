module.exports = [
  {
    type: 'input',
    name: 'identifier',
    message: "Enter your app's identifier",
    default: 'my-project',
    validate(name) {
      return (
        /^[a-z0-9][a-z0-9\-]*$/.test(name) ||
        'App identifier can only contain lowercase letters, numbers and -'
      );
    },
  },
];
