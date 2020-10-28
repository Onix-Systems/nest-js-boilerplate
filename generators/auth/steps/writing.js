const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;

  const authFolder = answers.sessionsStorage
    ? `${answers.db.toLowerCase()}/${answers.authType}/${answers.sessionsStorage}`
    : `${answers.db.toLowerCase()}/${answers.authType}`;

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
    this.templatePath(`${authFolder}/_.env`),
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
  if (fs.existsSync(`${fullPathToAuthFolder}/src/pipes`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/pipes/`),
      this.destinationPath(`${answers.identifier}/src/pipes/`),
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
  if (fs.existsSync(`${fullPathToAuthFolder}/src/dto`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/dto`),
      this.destinationPath(`${answers.identifier}/src/dto`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/interfaces`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/interfaces`),
      this.destinationPath(`${answers.identifier}/src/interfaces`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/responses`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/responses`),
      this.destinationPath(`${answers.identifier}/src/responses`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/interceptors`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/interceptors`),
      this.destinationPath(`${answers.identifier}/src/interceptors`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/decorators`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/decorators`),
      this.destinationPath(`${answers.identifier}/src/decorators`),
      payload,
    );
  }
  
  // DOCKER
  if (answers.wantedDocker.toLowerCase() === 'yes') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/docker-compose.yml`),
      this.destinationPath(`${answers.identifier}/docker-compose.yml`),
      payload,
    );
  }

  // MAILER
  if (answers.wantedMailer.toLowerCase() === 'yes') {
    this.fs.copyTpl(
      this.templatePath(`./mailer/module`),
      this.destinationPath(`${answers.identifier}/src/components/mailer`),
      payload,
    );

    this.fs.copyTpl(
      this.templatePath(`./mailer/${authFolder}/src/components/auth`),
      this.destinationPath(`${answers.identifier}/src/components/auth`),
      payload,
    );

    this.fs.copyTpl(
      this.templatePath(`./mailer/${authFolder}/_.env`),
      this.destinationPath(`${answers.identifier}/.env`),
      payload,
    );
  }
};
