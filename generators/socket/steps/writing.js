const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;

  const socketFolder = `${answers.db.toLowerCase()}/${answers.authType}`;

  const { wantedMailer } = answers;

  const pathToTmpAppModuleFile = wantedMailer === 'Yes'
    ? `${socketFolder}/src/components/app/mailer-app.module.ts`
    : `${socketFolder}/src/components/app/app.module.ts`;

  const fullPathToSocketFolder = join(`${__dirname}/../templates/${socketFolder}`);
  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;

  this.fs.copyTpl(
    this.templatePath(pathToTmpAppModuleFile),
    this.destinationPath(`${rootFolder}/src/components/app/app.module.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/components/app/app.gateway.ts`),
    this.destinationPath(`${rootFolder}/src/components/app/app.gateway.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${socketFolder}/src/components/auth`),
    this.destinationPath(`${rootFolder}/src/components/auth`),
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
