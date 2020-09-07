const fs = require('fs');
const { join } = require('path');

module.exports = function () {
  const { answers } = this.options;

  const authFolder = answers.sessionsStorage
    ? `${answers.authType}/${answers.sessionsStorage}`
    : answers.authType;

  if (!authFolder) {
    throw new Error('The auth folder is not existing');
  }

  const fullPathToAuthFolder = join(`${__dirname}/../templates/${authFolder}`);
  const payload = {
    config: answers,
  };

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/components/`),
    this.destinationPath(`${answers.identifier}/src/components/`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/guards/`),
    this.destinationPath(`${answers.identifier}/src/guards/`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/pipes/`),
    this.destinationPath(`${answers.identifier}/src/pipes/`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authFolder}/.env`),
    this.destinationPath(`${answers.identifier}/.env`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/_main.ts`),
    this.destinationPath(`${answers.identifier}/src/main.ts`),
    payload,
  );

  if (fs.existsSync(`${fullPathToAuthFolder}/public`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/public`),
      this.destinationPath(`${answers.identifier}/public`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/filters`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/filters`),
      this.destinationPath(`${answers.identifier}/src/filters`),
      payload,
    );
  }
};
