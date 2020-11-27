const Generator = require('yeoman-generator');
const generatorArguments = require('./arguments');
const generatorOptions = require('./options');
const generatorSteps = require('./steps');

module.exports = class AuthenticationGenerator extends Generator {
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

  get end() {
    return generatorSteps.end;
  }

  get initializing() {
    return generatorSteps.init;
  }

  get install() {
    return generatorSteps.install;
  }

  get prompting() {
    return generatorSteps.prompting;
  }

  get writing() {
    return generatorSteps.writing;
  }
};
