const chooseDependencies = require('../dependencies');

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
  }
  if (packageManager === 'yarn') {
    this.yarnInstall(general, { save: true }, { cwd: folderName });
    this.yarnInstall(dev, { saveDev: true }, { cwd: folderName });
  }
};
