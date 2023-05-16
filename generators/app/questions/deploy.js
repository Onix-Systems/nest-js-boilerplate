module.exports = [
  {
    type: 'list',
    name: 'deploy:heroku',
    message: 'Do you want to have a possibility to deploy on heroku?',
    default: 'No',
    choices: ['Yes', 'No'],
  },
]
