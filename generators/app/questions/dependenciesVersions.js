module.exports = [
  {
    type: 'list',
    name: 'needStableDependencies',
    message: 'Do you want install stable packages`s versions (if `no` will be istalled latest versions)',
    default: 'Yes',
    choices: ['Yes', 'No'],
  },
];
