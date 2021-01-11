const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;
  const authFolder = `${answers.db.toLowerCase()}/${answers.authType}`;

  const fullPathToAuthFolder = join(`${__dirname}/../templates/${authFolder}`);
  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/_.env`),
    this.destinationPath(`${rootFolder}/.env`),
    payload,
  );

  this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/components/app/app.module.ts`),
      this.destinationPath(`${rootFolder}/src/components/app/app.module.ts`),
      payload,
    );

  if (fs.existsSync(`${fullPathToAuthFolder}/src/templates`)) {
    this.fs.copyTpl(
      this.templatePath(`${fullPathToAuthFolder}/src/templates`),
      this.destinationPath(`${rootFolder}/src/templates`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/components/auth`)) {
    this.fs.copyTpl(
      this.templatePath(`${fullPathToAuthFolder}/src/components/auth`),
      this.destinationPath(`${rootFolder}/src/components/auth`),
      payload,
    );
  }
};
