const path = require('path');
const fs = require('fs');

module.exports = function() {
  const answers = this.answers;
  const payload = {
    config: answers,
  };

  if (fs.existsSync('./src')) {
    this.fs.copyTpl(
      this.templatePath(path.join('./src')),
      this.destinationPath(`${this.answers.identifier}/src`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(path.join('./index.js')),
    this.destinationPath(`${this.answers.identifier}/index.js`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./nest-cli.json')),
    this.destinationPath(`${this.answers.identifier}/nest-cli.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./package.json')),
    this.destinationPath(`${this.answers.identifier}/package.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./package-lock.json')),
    this.destinationPath(`${this.answers.identifier}/package-lock.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./README.md')),
    this.destinationPath(`${this.answers.identifier}/README.md`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./tsconfig.build.json')),
    this.destinationPath(`${this.answers.identifier}/tsconfig.build.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./tsconfig.json')),
    this.destinationPath(`${this.answers.identifier}/tsconfig.json`),
    payload,
  );

  // files with "_" prefix
  this.fs.copyTpl(
    this.templatePath(path.join('./_.editorconfig')),
    this.destinationPath(`${this.answers.identifier}/.editorconfig`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./_.env.example')),
    this.destinationPath(`${this.answers.identifier}/.env.example`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./_.eslintrc.json')),
    this.destinationPath(`${this.answers.identifier}/.eslintrc.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./_.gitignore')),
    this.destinationPath(`${this.answers.identifier}/.gitignore`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(path.join('./_.prettierrc')),
    this.destinationPath(`${this.answers.identifier}/.prettierrc`),
    payload,
  );

  if (answers['deploy:heroku'] === 'Yes') {
    this.fs.copyTpl(
      this.templatePath(path.join('./deploy-heroku.sh')),
      this.destinationPath(`${this.answers.identifier}/deploy-heroku.sh`),
      payload,
    );
  }
};
