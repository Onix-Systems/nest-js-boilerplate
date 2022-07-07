module.exports = function() {
  const { answers } = this.options;

  const rootFolder = answers.identifier;
  const adminFolder = `${answers.db.toLowerCase()}/${answers.authType}`;
  const payload = {
    config: answers,
  };

  this.fs.copyTpl(
    this.templatePath(`${adminFolder}/src/modules`),
    this.destinationPath(`${rootFolder}/src/modules`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(`${adminFolder}/src/exceptions`),
    this.destinationPath(`${rootFolder}/src/exceptions`),
    payload,
  );
};
