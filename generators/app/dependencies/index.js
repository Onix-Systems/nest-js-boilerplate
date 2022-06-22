const dbDependencies = require('./dependencies.json');

function getStableDep(dependenciesObj, versions) {
  const depArray = Object.entries(dependenciesObj[versions]).map(entriesArr => {
    return entriesArr.join('@');
  });

  return depArray.join(' ');
}

module.exports = function(db) {
  const dependenciesObj = dbDependencies[db.toLowerCase()];

  return Object.keys(dependenciesObj).reduce((acc, versions) => {
    acc[versions] = getStableDep(dependenciesObj, versions);

    return acc;
  }, {});
};
