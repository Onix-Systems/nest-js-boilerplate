module.exports = function() {
  const fs = require('fs');
  const { answers } = this.options;

  const rootFolder = answers.identifier;
  const adminFolder = `${answers.db.toLowerCase()}/${answers.authType}`;
  const payload = {
    config: answers,
  };

  if (answers.wantedPrismaOrTypeOrmOrMongoose !== 'Prisma') {
    this.fs.copyTpl(
      this.templatePath(`${adminFolder}/src/modules`),
      this.destinationPath(`${rootFolder}/src/modules`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(`${adminFolder}/src/exceptions`),
    this.destinationPath(`${rootFolder}/src/exceptions`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${adminFolder}/migrations`),
    this.destinationPath(`${rootFolder}/migrations`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${adminFolder}/migrate-mongo-config.js`),
    this.destinationPath(`${rootFolder}/migrate-mongo-config.js`),
    payload,
  );
};
