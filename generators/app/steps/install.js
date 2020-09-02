const chalk = require('chalk');

module.exports = function () {
  if (this.options['skip-install']) {
    this.log(chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${this.answers.identifier}/
        ${chalk.white('$')} npm install
      `));
  } else {
    this.installDependencies({
      npm: this.answers.packageManager === 'npm',
      yarn: this.answers.packageManager === 'yarn',
      bower: false,
    });
  }
};
