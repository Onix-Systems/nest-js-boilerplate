const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;

  // const mailerFolder =
  //   answers.wantedMailer.toLowerCase() === 'yes' ? '/withMailer' : '';
  // const authFolder = `${answers.db.toLowerCase()}${mailerFolder}/${
  //   answers.authType
  // }`;
  const authFolder = `${answers.db.toLowerCase()}/${answers.authType}`;

  const { sessionsStorage } = answers;

  // file what's different for every session storage (Main.ts is our app bootstrap/runner)
  const pathToTmpMainFile = sessionsStorage
    ? `${authFolder}/src/_${sessionsStorage}-main.ts`
    : `${authFolder}/src/_main.ts`;

  const fullPathToAuthFolder = join(`${__dirname}/../templates/${authFolder}`);
  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/components/`),
    this.destinationPath(`${rootFolder}/src/components/`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/guards/`),
    this.destinationPath(`${rootFolder}/src/guards/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/_.env`),
    this.destinationPath(`${rootFolder}/.env`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(pathToTmpMainFile),
    this.destinationPath(`${rootFolder}/src/main.ts`),
    payload,
  );

  if (fs.existsSync(`${fullPathToAuthFolder}/public`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/public`),
      this.destinationPath(`${rootFolder}/public`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/pipes`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/pipes/`),
      this.destinationPath(`${rootFolder}/src/pipes/`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/filters`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/filters`),
      this.destinationPath(`${rootFolder}/src/filters`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/dto`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/dto`),
      this.destinationPath(`${rootFolder}/src/dto`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/interfaces`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/interfaces`),
      this.destinationPath(`${rootFolder}/src/interfaces`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/responses`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/responses`),
      this.destinationPath(`${rootFolder}/src/responses`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/interceptors`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/interceptors`),
      this.destinationPath(`${rootFolder}/src/interceptors`),
      payload,
    );
  }
  if (fs.existsSync(`${fullPathToAuthFolder}/src/decorators`)) {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/decorators`),
      this.destinationPath(`${rootFolder}/src/decorators`),
      payload,
    );
  }

  // DOCKER
  if (answers.wantedDocker.toLowerCase() === 'yes') {
    if (sessionsStorage) {
      this.fs.copyTpl(
        this.templatePath(
          `${authFolder}/_${sessionsStorage}-docker-compose.yml`,
        ),
        this.destinationPath(`${rootFolder}/docker-compose.yml`),
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`${authFolder}/docker-compose.yml`),
        this.destinationPath(`${rootFolder}/docker-compose.yml`),
        payload,
      );
    }
  }
};
