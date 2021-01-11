const stabledbDependencies = require('./stableDependencies.json');
const dbDependencies = require('./latestDependencies.json');

module.exports = function(needStableDependencies, db) {
  if (needStableDependencies === 'Yes') {
    return stabledbDependencies[db.toLowerCase()];
  }

  return dbDependencies[db.toLowerCase()];
};
