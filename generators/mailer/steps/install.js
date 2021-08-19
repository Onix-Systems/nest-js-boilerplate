const chooseDependencies = require('../dependencies');
const cp = require('child_process');

module.exports = function() {
  const {
    packageManager,
    identifier: folderName,
    needStableDependencies,
  } = this.options.answers;
  const { general, dev } = chooseDependencies(needStableDependencies);

  if (packageManager === 'npm') {
    this.npmInstall(general, { save: true }, { cwd: folderName });
    this.npmInstall(dev, { saveDev: true }, { cwd: folderName });
    cp.spawn('npm', ['install', '--save', '--force', '@nestjs-modules/mailer@1.6.0', 'nodemailer@6.6.3'], {
      env: process.env,
      cwd: folderName,
      stdio: 'inherit'
    });
    cp.spawn('npm', ['install', '--save-dev', '--force', '@types/nodemailer@6.4.4'], {
      env: process.env,
      cwd: folderName,
      stdio: 'inherit'
    });
    return;
  }
  if (packageManager === 'yarn') {
    this.yarnInstall(general, { save: true }, { cwd: folderName });
    this.yarnInstall(dev, { saveDev: true }, { cwd: folderName });
    cp.spawn('yarn', ['install', '--save', '--force', '@nestjs-modules/mailer@1.6.0', 'nodemailer@6.6.3'], {
      env: process.env,
      cwd: folderName,
      stdio: 'inherit'
    });
    cp.spawn('yarn', ['install', '--save-dev', '--force', '@types/nodemailer@6.4.4'], {
      env: process.env,
      cwd: folderName,
      stdio: 'inherit'
    });
    return;
  }
};
