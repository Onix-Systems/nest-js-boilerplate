module.exports = [
  {
    type: 'list',
    name: 'deploy:heroku',
    message: 'Do you want to have a possibillity to deploy on heroku?',
    default: 'No',
    choices: ['Yes', 'No'],
  },
]
