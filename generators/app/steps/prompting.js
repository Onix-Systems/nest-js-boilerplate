const chalk = require('chalk');
const questions = require('../questions');

/**
 * Step 2
 * Where you prompt users for options (where you'd call this.prompt()).
 */
function askQuestions(title, questions, done) {
  this.log(chalk.yellow(`\n${title} questions:`));

  return this.prompt(questions).then(answers => {
    this.answers = Object.assign(this.answers || {}, answers);
    done();
  });
}

module.exports = {
  askPackageManager() {
    askQuestions.call(
      this,
      'Package Manager',
      questions.packageManager,
      this.async(),
    );
  },

  askAppName() {
    askQuestions.call(this, 'Application', questions.app, this.async());
  },

  askAuthType() {
    askQuestions.call(this, 'Auth', questions.auth.type, this.async());
  },

  askAdditionalAuthQuestions() {
    askQuestions.call(
      this,
      'Auth additional questions',
      questions.auth.additionalQuestions[this.answers.authType],
      this.async(),
    );
  },

  askAboutDatabase() {
    askQuestions.call(this, 'Database', questions.db, this.async());
  },

  askAboutMailer() {
    askQuestions.call(this, 'Mailer module', questions.mailer.isNeeded, this.async());
  },

  askAdditionalMailerQuestions() {
    askQuestions.call(
      this,
      'Mailer additional questions',
      questions.mailer.additionalQuestions[this.answers.wantedMailer],
      this.async(),
    )
  },
  
  askWouldHeLikeDocker() {
    askQuestions.call(this, 'Docker', questions.docker, this.async());
  },

  askWouldHeLikeToDeployOnHeroku() {
    askQuestions.call(this, 'Deploy on heroku', questions.deploy, this.async());
  },

  askAppIdentifier() {
    askQuestions.call(
      this,
      'App Identifier',
      questions.identifier,
      this.async(),
    );
  },

  askDescription() {
    askQuestions.call(
      this,
      'App Description',
      questions.description,
      this.async(),
    );
  },
};
