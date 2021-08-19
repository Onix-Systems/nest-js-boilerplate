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

  const { wantedMailer, wantedJsonApi } = answers;
  let pathToTmpAppModuleFile = '';

  switch (authFolder) {
    case 'mongodb/jwt':
      pathToTmpAppModuleFile = (wantedMailer === 'Yes' && wantedJsonApi === 'Yes')
        ? `${fullPathToAuthFolder}/src/routes/v1/auth/mailer-auth.controller.ts`
        : `${fullPathToAuthFolder}/src/routes/v1/auth/auth.controller.ts`;

      this.fs.copyTpl(
        this.templatePath(pathToTmpAppModuleFile),
        this.destinationPath(
          `${rootFolder}/src/routes/v1/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/wrap-response.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/wrap-response.interceptor.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/success-response.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/success-response.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/pagination.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/pagination.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/response.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/response.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.controller.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.controller.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.service.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.service.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.repository.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.repository.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/entity/user-response.entity.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/entity/user-response.entity.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/serialization.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/serialization.interceptor.ts`),
        payload,
      );
      break;
    case "mysql/jwt":
      pathToTmpAppModuleFile = (wantedMailer === 'Yes' && wantedJsonApi === 'Yes')
        ? `${fullPathToAuthFolder}/src/routes/v1/auth/mailer-auth.controller.ts`
        : `${fullPathToAuthFolder}/src/routes/v1/auth/auth.controller.ts`;

      this.fs.copyTpl(
        this.templatePath(pathToTmpAppModuleFile),
        this.destinationPath(
          `${rootFolder}/src/routes/v1/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/wrap-response.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/wrap-response.interceptor.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/success-response.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/success-response.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/paginatedEntity.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/paginatedEntity.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/pagination-params.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/pagination-params.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/pagination.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/pagination.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/response.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/response.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.controller.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.controller.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.service.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.service.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.repository.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.repository.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/entities/user-response.entity.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/entities/user-response.entity.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/serialization.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/serialization.interceptor.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/constants/common.constants.ts`),
        this.destinationPath(`${rootFolder}/src/constants/common.constants.ts`),
        payload,
      );
      break;
    case "postgresql/jwt":
      console.log('postgresql/jwt jsonapi')
      pathToTmpAppModuleFile = (wantedMailer === 'Yes' && wantedJsonApi === 'Yes')
        ? `${fullPathToAuthFolder}/src/routes/v1/auth/mailer-auth.controller.ts`
        : `${fullPathToAuthFolder}/src/routes/v1/auth/auth.controller.ts`;

      this.fs.copyTpl(
        this.templatePath(pathToTmpAppModuleFile),
        this.destinationPath(
          `${rootFolder}/src/routes/v1/auth/auth.controller.ts`,
        ),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/wrap-response.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/wrap-response.interceptor.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/success-response.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/success-response.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/paginatedEntity.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/paginatedEntity.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interfaces/pagination-params.interface.ts`),
        this.destinationPath(`${rootFolder}/src/interfaces/pagination-params.interface.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/pagination.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/pagination.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/utils/response.utils.ts`),
        this.destinationPath(`${rootFolder}/src/utils/response.utils.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.controller.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.controller.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.service.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.service.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/users.repository.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/users.repository.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/routes/v1/users/entities/user-response.entity.ts`),
        this.destinationPath(`${rootFolder}/src/routes/v1/users/entities/user-response.entity.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/interceptors/serialization.interceptor.ts`),
        this.destinationPath(`${rootFolder}/src/interceptors/serialization.interceptor.ts`),
        payload,
      );

      this.fs.copyTpl(
        this.templatePath(`${authFolder}/src/constants/common.constants.ts`),
        this.destinationPath(`${rootFolder}/src/constants/common.constants.ts`),
        payload,
      );
      break;
  }
}
