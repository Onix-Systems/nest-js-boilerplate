const Generator = require('yeoman-generator');

const generatorSteps = require('./steps');
const generatorArguments = require('./arguments');
const generatorOptions = require('./options');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    Object.keys(generatorArguments).forEach((key) => {
      return this.argument(key, generatorArguments[key]);
    });
    Object.keys(generatorOptions).forEach((key) => {
      return this.option(key, generatorOptions[key]);
    });
  }

  get configuring() {
    return generatorSteps.configuring;
  }

  get conflicts() {
    return generatorSteps.conflicts;
  }

  get initializing() {
    return generatorSteps.init;
  }

  get prompting() {
    return generatorSteps.prompting;
  }

  get writing() {
    return generatorSteps.writing;
  }

  get install() {
    return generatorSteps.install;
  }

  get end() {
    return generatorSteps.end;
  }
};
