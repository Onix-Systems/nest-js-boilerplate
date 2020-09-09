/**
 * Step 8
 * Called last, cleanup, say good bye, etc
 */
const chalk = require('chalk');
const printMessage = require('print-message');

module.exports = function() {
  this.composeWith('nest-js-boilerplate:auth', {
    answers: this.answers,
  });

  printMessage(
    [
      `Enjoy your ${chalk.red('Nestjs REST API')} project!`,
      '---',
      'Next steps:',
      `${chalk.yellow('1)')} Go to your generated api`,
      chalk.blue('cd <path_to_your_generated_app>'),
      `${chalk.yellow('2)')} Run your api`,
      chalk.blue(`${this.answers.packageManager} run start:dev`),
    ],
    {
      printFn: this.log,
    },
  );
};
