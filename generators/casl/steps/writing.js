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

  if (answers.wantedPrismaOrTypeOrmOrMongoose !== 'Prisma') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/users/`),
      this.destinationPath(`${rootFolder}/src/modules/v1/users/`),
      payload,
    );
  }

  if (answers.db !== 'Mongodb') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/roles/`),
      this.destinationPath(`${rootFolder}/src/modules/v1/roles/`),
      payload,
    );
  }

  if (answers.authType === 'passportLocal') {
    this.fs.copyTpl(
      this.templatePath(`${authFolder}/src/modules/v1/home/`),
      this.destinationPath(`${rootFolder}/src/modules/v1/home/`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/guards/`),
    this.destinationPath(`${rootFolder}/src/guards/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/decorators/`),
    this.destinationPath(`${rootFolder}/src/decorators/`),
    payload,
  );

  this.fs.copyTpl(
    this.templatePath(`${authFolder}/src/casl-ability/`),
    this.destinationPath(`${rootFolder}/src/casl-ability/`),
    payload,
  );

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
