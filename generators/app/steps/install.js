const chalk = require('chalk');

const dbDependencies = {
  mongodb: {
    general: ['mongoose', '@nestjs/mongoose', 'mongodb'],
    dev: ['@types/mongoose'],
  },
  mysql: {
    general: ['mysql', '@nestjs/typeorm', 'typeorm'],
    dev: ['@types/typeorm'],
  },
};

module.exports = function () {
  const { packageManager, db, identifier: folderName } = this.answers;

  if (this.options['skip-install']) {
    this.log(
      chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${folderName}/
        ${chalk.white('$')} npm install
      `),
    );
    return;
  }

  const { general, dev } = dbDependencies[db.toLowerCase()];

  if (packageManager === 'npm') {
    // at the first, install all common packages in the package.json with npm
    this.npmInstall(null, { save: true }, { cwd: folderName });
    this.npmInstall(general, { save: true }, { cwd: folderName });
    this.npmInstall(dev, { saveDev: true }, { cwd: folderName });
  }
  if (packageManager === 'yarn') {
    // at the first, install all common packages in the package.json with yarn
    this.yarnInstall(null, { save: true }, { cwd: folderName });
    this.yarnInstall(general, { save: true }, { cwd: folderName });
    this.yarnInstall(dev, { saveDev: true }, { cwd: folderName });
  }
};
