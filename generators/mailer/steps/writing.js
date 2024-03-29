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
    this.templatePath(`${authFolder}/src/modules/app/app.module.ts`),
    this.destinationPath(`${rootFolder}/src/modules/app/app.module.ts`),
    payload,
  );

  switch (authFolder) {
    case 'mongodb/jwt':
      // templates
      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/templates`),
        this.destinationPath(`${rootFolder}/src/templates`),
        payload,
      );

      // auth
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/modules/v1/auth/auth.controller.ts`),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.controller.ts`,
        ),
        payload,
      );


      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        payload,
      );
      break;
    case 'mongodb/passportLocal':
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
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/modules/v1/auth/auth.controller.ts`),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/serializers`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/auth/serializers`),
        payload,
      );

      // users
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/users.repository.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/users/users.repository.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/users.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/users/users.service.ts`,
        ),
        payload,
      );
      break;
    case "mysql/jwt":
      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/templates`),
        this.destinationPath(`${rootFolder}/src/templates`),
        payload,
      );

      // auth
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/modules/v1/auth/auth.controller.ts`),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.controller.ts`,
        ),
        payload,
      );
      break;
    case "mysql/passportLocal":
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
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/modules/v1/auth/auth.controller.ts`),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/serializers`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/auth/serializers`),
        payload,
      );

      // users
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/interfaces`,
        ),
        this.destinationPath(`${rootFolder}/src/modules/v1/users/interfaces`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/users.repository.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/users/users.repository.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/users/users.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/users/users.service.ts`,
        ),
        payload,
      );
      break;
    case "postgresql/jwt":
      // templates
      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/templates`),
        this.destinationPath(`${rootFolder}/src/templates`),
        payload,
      );

      // auth
      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth-constants.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${fullPathToAuthFolder}/src/modules/v1/auth/auth.controller.ts`),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.controller.ts`,
        ),
        payload,
      );


      this.fs.copyTpl(
        this.templatePath(
          `${fullPathToAuthFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        this.destinationPath(
          `${rootFolder}/src/modules/v1/auth/auth.service.ts`,
        ),
        payload,
      );
      break;
    default:
      break;
  }
};
