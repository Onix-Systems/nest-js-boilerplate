const packageManager = require('./packageManager');
const app = require('./app');
const authType = require('./authType');
const additionalAuthQuestions = require('./additionalAuthQuestions');
const identifier = require('./identifier');
const description = require('./description');
const docker = require('./docker');
const db = require('./db');
const deploy = require('./deploy');
const mailer = require('./mailer');
const additionalMailerQuestions = require('./additionalMailerQuestions');

module.exports = {
  packageManager,
  app,
  auth: {
    type: authType,
    additionalQuestions: additionalAuthQuestions,
  },
  identifier,
  description,
  docker,
  db,
  deploy,
  mailer: {
    isNeeded: mailer,
    additionalQuestions: additionalMailerQuestions,
  },
};
