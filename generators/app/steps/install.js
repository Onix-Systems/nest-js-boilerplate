const chalk = require('chalk');

module.exports = function() {
  if (this.options['skip-install']) {
    this.log(
      chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${this.answers.identifier}/
        ${chalk.white('$')} npm install
      `),
    );
    return;
  }

  const folderName = this.answers.identifier;
  const { packageManager } = this.answers;

  if (packageManager === 'npm') {
    this.npmInstall(null, { save: true }, { cwd: folderName });
  }
  if (packageManager === 'yarn') {
    this.yarnInstall(null, { save: true }, { cwd: folderName });
  }
};
