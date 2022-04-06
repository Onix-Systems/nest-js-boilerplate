const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;

  const socketFolder = `${answers.db.toLowerCase()}/${answers.authType}`;

  const { wantedMailer } = answers;

  const pathToTmpAppModuleFile = wantedMailer === 'Yes'
    ? `${socketFolder}/src/modules/app/mailer-app.module.ts`
    : `${socketFolder}/src/modules/app/app.module.ts`;

  const fullPathToSocketFolder = join(`${__dirname}/../templates/${socketFolder}`);
  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/typedoc.json`),
    this.destinationPath(`${rootFolder}/typedoc.json`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(pathToTmpAppModuleFile),
    this.destinationPath(`${rootFolder}/src/modules/app/app.module.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/modules/app/app.gateway.ts`),
    this.destinationPath(`${rootFolder}/src/modules/app/app.gateway.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/modules/v1/auth`),
    this.destinationPath(`${rootFolder}/src/modules/v1/auth`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/filters/`),
    this.destinationPath(`${rootFolder}/src/filters/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/guards/`),
    this.destinationPath(`${rootFolder}/src/guards/`),
    payload,
  );
};
