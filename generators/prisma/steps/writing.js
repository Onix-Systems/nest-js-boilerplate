const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;
  const prismaFolder = `${answers.db.toLowerCase()}/${answers.authType}`;
  

  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;
  const { sessionsStorage } = answers;

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/modules/app/app.module.ts`),
    this.destinationPath(`${rootFolder}/src/modules/app/app.module.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/modules/v1/auth`),
    this.destinationPath(`${rootFolder}/src/modules/v1/auth`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/modules/v1/users/`),
    this.destinationPath(`${rootFolder}/src/modules/v1/users/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/modules/v1/roles/`),
    this.destinationPath(`${rootFolder}/src/modules/v1/roles/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/guards/`),
    this.destinationPath(`${rootFolder}/src/guards/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/src/decorators/`),
    this.destinationPath(`${rootFolder}/src/decorators/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/prisma`),
    this.destinationPath(`${rootFolder}/prisma`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${prismaFolder}/.env`),
    this.destinationPath(`${rootFolder}/.env`),
    payload,
  );

  // DOCKER
  if (answers.wantedDocker.toLowerCase() === 'yes') {
    if (sessionsStorage) {
      this.fs.copyTpl(
        this.templatePath(
          `${prismaFolder}/_${sessionsStorage}-docker-compose.yml`,
        ),
        this.destinationPath(`${rootFolder}/docker-compose.yml`),
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`${prismaFolder}/docker-compose.yml`),
        this.destinationPath(`${rootFolder}/docker-compose.yml`),
        payload,
      );
    }
  }
};
