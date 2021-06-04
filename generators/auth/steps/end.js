/**
 * Step 8
 * Called last, cleanup, say good bye, etc
 */

module.exports = function() {
  const { wantedMailer, wantedSocket } = this.options.answers;

  if (wantedMailer === 'Yes') {
    this.composeWith('nest-js-boilerplate:mailer', {
      answers: this.options.answers,
    });
  }

  if (wantedSocket === 'Yes') {
    this.composeWith('nest-js-boilerplate:socket', {
      answers: this.options.answers,
    });
  }
};
