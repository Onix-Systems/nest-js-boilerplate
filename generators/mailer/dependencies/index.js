const stableMailerDependencies = require('./stableDependencies.json');
const mailerDependencies = require('./latestDependencies.json');

module.exports = function(needStableDependencies) {
  if (needStableDependencies === 'Yes') {
    return stableMailerDependencies;
  }

  return mailerDependencies;
};
