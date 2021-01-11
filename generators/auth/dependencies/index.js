const stableAuthTypeDependencies = require('./stableDependencies.json');
const authTypeDependencies = require('./latestDependencies.json');

module.exports = function({
  authType,
  sessionsStorage,
  needStableDependencies,
}) {
  const dependencies =
    needStableDependencies === 'Yes'
      ? stableAuthTypeDependencies
      : authTypeDependencies;

  const { hasSessionsStorage } = dependencies[authType];
  const generalDependencies = hasSessionsStorage
    ? dependencies[authType].general[sessionsStorage]
    : dependencies[authType].general;
  const devDependencies = hasSessionsStorage
    ? dependencies[authType].dev[sessionsStorage]
    : dependencies[authType].dev;

  const mergedGeneralDependencies = generalDependencies.concat(
    dependencies.common.general,
  );
  const mergedDevDependencies = devDependencies.concat(dependencies.common.dev);

  return {
    general: mergedGeneralDependencies.join(' '),
    dev: mergedDevDependencies.join(' '),
  };
};
