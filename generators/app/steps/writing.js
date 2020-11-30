const { join } = require('path');
const fs = require('fs');

module.exports = function () {
  const { answers } = this;
  const payload = {
    config: answers,
  };
  const pathToApp = answers.identifier;

  if (fs.existsSync('./src')) {
    this.fs.copyTpl(
      this.templatePath(join('./src')),
      this.destinationPath(`${pathToApp}/src`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(join('./index.js')),
    this.destinationPath(`${pathToApp}/index.js`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./nest-cli.json')),
    this.destinationPath(`${pathToApp}/nest-cli.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./package.json')),
    this.destinationPath(`${pathToApp}/package.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./package-lock.json')),
    this.destinationPath(`${pathToApp}/package-lock.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./README.md')),
    this.destinationPath(`${pathToApp}/README.md`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./tsconfig.build.json')),
    this.destinationPath(`${pathToApp}/tsconfig.build.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./tsconfig.json')),
    this.destinationPath(`${pathToApp}/tsconfig.json`),
    payload,
  );

  // files with "_" prefix
  this.fs.copyTpl(
    this.templatePath(join('./_.editorconfig')),
    this.destinationPath(`${pathToApp}/.editorconfig`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.env.example')),
    this.destinationPath(`${pathToApp}/.env.example`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.eslintrc.json')),
    this.destinationPath(`${pathToApp}/.eslintrc.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.gitignore')),
    this.destinationPath(`${pathToApp}/.gitignore`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.prettierrc')),
    this.destinationPath(`${pathToApp}/.prettierrc`),
    payload,
  );

  // DOCKER
  if (answers.wantedDocker.toLowerCase() === 'yes') {
    this.fs.copyTpl(
      this.templatePath(join('./docker')),
      this.destinationPath(`${pathToApp}/docker`),
      payload,
    );
  }

  // DEPLOYS ON CLOUD
  if (answers['deploy:heroku'] === 'Yes') {
    this.fs.copyTpl(
      this.templatePath(join('./deploy-heroku.sh')),
      this.destinationPath(`${pathToApp}/deploy-heroku.sh`),
      payload,
    );
  }
};
