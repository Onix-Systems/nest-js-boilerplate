const dependenciesObj = require('./dependencies.json');

function getStableDep(dependenciesObj, versions) {
  const depArray = Object.entries(dependenciesObj[versions]).map(entriesArr => {
    return entriesArr.join('@');
  });

  return depArray.join(' ');
}

function getLatestDep(dependenciesObj, versions) {
  const depArray = Object.keys(dependenciesObj[versions]);

  return depArray.join(' ');
}

module.exports = function(needStableDependencies) {
  const getDependencies =
    needStableDependencies === 'Yes' ? getStableDep : getLatestDep;

  return Object.keys(dependenciesObj).reduce((acc, versions) => {
    acc[versions] = getDependencies(dependenciesObj, versions);

    return acc;
  }, {});
};
