const mailerDependencies = {
  general: ['@nestjs-modules/mailer', 'nodemailer'],
  dev: ['@types/nodemailer'],
};

module.exports = function() {
  const { packageManager, identifier: folderName } = this.options.answers;
  console.log('answer: ', this.options.answers);
  if (packageManager === 'npm') {
    this.npmInstall(
      mailerDependencies.general,
      { save: true },
      { cwd: folderName },
    );
    this.npmInstall(
      mailerDependencies.dev,
      { saveDev: true },
      { cwd: folderName },
    );
  }
  if (packageManager === 'yarn') {
    this.yarnInstall(
      mailerDependencies.general,
      { save: true },
      { cwd: folderName },
    );
    this.yarnInstall(
      mailerDependencies.dev,
      { saveDev: true },
      { cwd: folderName },
    );
  }
};
