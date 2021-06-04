const dependenciesObj = require('./dependencies.json');

function getStableDep(dependenciesObj) {
  const depArray = Object.entries(dependenciesObj).map(entriesArr => {
    return entriesArr.join('@');
  });

  return depArray.join(' ');
}

function getLatestDep(dependenciesObj) {
  const depArray = Object.keys(dependenciesObj);

  return depArray.join(' ');
}

module.exports = function({
  authType,
  sessionsStorage,
  needStableDependencies,
}) {
  const getDependencies =
    needStableDependencies === 'Yes' ? getStableDep : getLatestDep;

  const { hasSessionsStorage } = dependenciesObj[authType];
  const generalDependenciesObj = hasSessionsStorage
    ? dependenciesObj[authType].general[sessionsStorage]
    : dependenciesObj[authType].general;
  const devDependenciesObj = hasSessionsStorage
    ? dependenciesObj[authType].dev[sessionsStorage]
    : dependenciesObj[authType].dev;
  const mergedGeneralDependenciesObj = {
    ...generalDependenciesObj,
    ...dependenciesObj.common.general,
  };
  const mergedDevDependenciesObj = {
    ...devDependenciesObj,
    ...dependenciesObj.common.dev,
  };

  return {
    general: getDependencies(mergedGeneralDependenciesObj),
    dev: getDependencies(mergedDevDependenciesObj),
  };
};
