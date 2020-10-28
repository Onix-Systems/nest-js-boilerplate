module.exports = [
  {
    type: 'list',
    name: 'packageManager',
    message: 'Choose the package manager for your app',
    default: 'npm',
    choices: ['npm', 'yarn'],
  },
];
