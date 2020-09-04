const authTypes = {
  jwt: 'jwt',
  'passport-local': 'passportLocal',
  oauth2: 'oauth2',
  default: 'jwt',
};

module.exports = function () {
  const { answers } = this.options;

  const authType = authTypes[answers.authType] || authTypes.default;
  const payload = {
    config: answers,
  };

  this.fs.copyTpl(
    this.templatePath(`${authType}/src/components/`),
    this.destinationPath(`${answers.identifier}/src/components/`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authType}/src/guards/`),
    this.destinationPath(`${answers.identifier}/src/guards`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authType}/src/pipes/`),
    this.destinationPath(`${answers.identifier}/src/pipes`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authType}/.env`),
    this.destinationPath(`${answers.identifier}/.env`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${authType}/src/_main.ts`),
    this.destinationPath(`${answers.identifier}/src/main.ts`),
    payload,
  );
};
