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

  switch (answers.authType) {
    case 'jwt':
      // templates
      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/templates`),
        this.destinationPath(`${rootFolder}/src/templates`),
        payload,
      );

      // auth
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth.controller.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth.service.ts`,
        ),
        payload,
      );
      break;
    case 'passportLocal':
      // templates
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/public/views/mailer/templates`,
        ),
        this.destinationPath(`${rootFolder}/public/views/mailer/templates`),
        payload,
      );

      // auth
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth.controller.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/auth/auth.service.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/auth/serializers`,
        ),
        this.destinationPath(`${rootFolder}/src/components/auth/serializers`),
        payload,
      );

      // users
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/components/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/components/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/users/users.repository.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/users/users.repository.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/components/users/users.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/components/users/users.service.ts`,
        ),
        payload,
      );
      break;
    default:
      break;
  }
};
