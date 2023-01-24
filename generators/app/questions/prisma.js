module.exports = {
    Mongodb: {
      jwt: [],
      oauth2: [],
      passportLocal: [],
    },
  
    Mysql: {
      jwt: [
        {
            type: 'list',
            name: 'wantedPrisma',
            message: 'Would you like to choose Prisma?',
            choices: ['Yes', 'No'],
        }
      ],
      oauth2: [
        {
            type: 'list',
            name: 'wantedPrisma',
            message: 'Would you like to choose Prisma?',
            choices: ['Yes', 'No'],
        }
      ],
      passportLocal: [
        {
            type: 'list',
            name: 'wantedPrisma',
            message: 'Would you like to choose Prisma?',
            choices: ['Yes', 'No'],
        }
      ],
    },
  
    Postgresql: {
      jwt: [
        {
            type: 'list',
            name: 'wantedPrisma',
            message: 'Would you like to choose Prisma?',
            choices: ['Yes', 'No'],
        }
      ],
      oauth2: [],
      passportLocal: [],
    },
  }
  