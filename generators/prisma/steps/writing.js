const fs = require('fs');
const { join } = require('path');

module.exports = function() {
  const { answers } = this.options;
  const authFolder = `${answers.db.toLowerCase()}/${answers.authType}`;
  

  const payload = {
    config: answers,
  };
  const rootFolder = answers.identifier;
  const { sessionsStorage } = answers;

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/modules/app/app.module.ts`),
    this.destinationPath(`${rootFolder}/src/modules/app/app.module.ts`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/modules/v1/auth`),
    this.destinationPath(`${rootFolder}/src/modules/v1/auth`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/modules/v1/users/`),
    this.destinationPath(`${rootFolder}/src/modules/v1/users/`),
    payload,
  );

  if (answers.authType === 'passportLocal') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/home/`),
      this.destinationPath(`${rootFolder}/src/modules/v1/home/`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/interfaces/`),
    this.destinationPath(`${rootFolder}/src/interfaces/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/guards/`),
    this.destinationPath(`${rootFolder}/src/guards/`),
    payload,
  );

  if (answers.db === 'Mongodb' || answers.db === 'Postgresql') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/main.ts`),
      this.destinationPath(`${rootFolder}/src/main.ts`),
      payload,
    );
  }

  if (answers.db === 'Mysql' && answers.authType === 'jwt') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/_main.ts`),
      this.destinationPath(`${rootFolder}/src/_main.ts`),
      payload,
    );
  }

  if (answers.db !== 'Mongodb') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/roles`),
      this.destinationPath(`${rootFolder}/src/modules/v1/roles`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/decorators/`),
    this.destinationPath(`${rootFolder}/src/decorators/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/prisma`),
    this.destinationPath(`${rootFolder}/prisma`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/.env`),
    this.destinationPath(`${rootFolder}/.env`),
    payload,
  );

  if (answers.wantedAdminPanel.toLowerCase() === 'yes') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/admin/`),
      this.destinationPath(`${rootFolder}/src/modules/v1/admin/`),
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
