const authTypeDependencies = {
  common: {
    general: ['@nestjs/passport', 'passport'],
    dev: [],
  },
  jwt: {
    hasSessionsStorage: false,
    general: [
      'passport-local',
      '@nestjs/jwt',
      'passport-jwt',
      'nestjs-redis',
      'ioredis',
    ],
    dev: [
      '@types/passport-local',
      '@types/passport-jwt',
    ],
  },
  oauth2: {
    hasSessionsStorage: true,
    general: {
      redis: [
        'passport-google-oauth20',
        'express-session',
        'cookie-parser',
        'connect-redis',
        'redis',
      ],
      mongodb: [
        'passport-google-oauth20',
        'express-session',
        'cookie-parser',
        'connect-mongodb-session',
        'mongodb',
      ],
      mysql: [
        'passport-google-oauth20',
        'express-session',
        'express-mysql-session',
      ],
    },
    dev: {
      redis: [
        '@types/passport-google-oauth20',
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
        '@types/redis',
        '@types/connect-redis',
      ],
      mongodb: [
        '@types/passport-google-oauth20',
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
      ],
      mysql: [
        '@types/passport-google-oauth20',
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
      ],
    },
  },
  passportLocal: {
    hasSessionsStorage: true,
    general: {
      redis: [
        'passport-local',
        'express-session',
        'hbs',
        'express-handlebars',
        'cookie-parser',
        'connect-redis',
        'connect-flash',
        'redis',
      ],
      mongodb: [
        'passport-local',
        'express-session',
        'hbs',
        'express-handlebars',
        'cookie-parser',
        'connect-mongodb-session',
        'connect-flash',
        'mongodb',
      ],
      mysql: [
        'passport-local',
        'express-session',
        'hbs',
        'express-handlebars',
        'cookie-parser',
        'connect-flash',
        'express-mysql-session',
      ],
    },
    dev: {
      redis: [
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
        '@types/redis',
        '@types/connect-redis',
      ],
      mongodb: [
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
      ],
      mysql: [
        '@types/passport-local',
        '@types/connect-flash',
        '@types/express-handlebars',
        '@types/express-session',
      ],
    },
  },
};

const mailerDependencies = [
  '@nestjs-modules/mailer'
]

module.exports = function() {
  const folderName = this.options.answers.identifier;
  const { authType, packageManager, sessionsStorage, wantedMailer } = this.options.answers;

  const { hasSessionsStorage } = authTypeDependencies[authType];

  const generalDependencies = hasSessionsStorage
    ? authTypeDependencies[authType].general[sessionsStorage]
    : authTypeDependencies[authType].general;
  const devDependencies = hasSessionsStorage
    ? authTypeDependencies[authType].dev[sessionsStorage]
    : authTypeDependencies[authType].dev;

  let mergedGeneralDependencies = generalDependencies.concat(
    authTypeDependencies.common.general,
  );
  let mergedDevDependencies = devDependencies.concat(
    authTypeDependencies.common.dev,
  );
  
  if (wantedMailer) {
    mergedGeneralDependencies = mergedGeneralDependencies.concat(
      mailerDependencies
    )
  }

  if (packageManager === 'npm') {
    this.npmInstall(mergedGeneralDependencies, { save: true }, { cwd: folderName });
    this.npmInstall(mergedDevDependencies, { saveDev: true }, { cwd: folderName });
  }
  if (packageManager === 'yarn') {
    this.yarnInstall(mergedGeneralDependencies, { save: true }, { cwd: folderName });
    this.yarnInstall(mergedDevDependencies, { saveDev: true }, { cwd: folderName });
  }
};
