module.exports = {
    Mongodb: {
      jwt: [
        {
          type: 'list',
          name: 'wantedPrismaOrTypeOrmOrMongoose',
          message: 'Would you like to choose Prisma or Mongoose?',
          choices: ['Mongoose', 'Prisma'],
        }
      ],
      oauth2: [
        {
          type: 'list',
          name: 'wantedPrismaOrTypeOrmOrMongoose',
          message: 'Would you like to choose Prisma or Mongoose?',
          choices: ['Mongoose', 'Prisma'],
        }
      ],
      passportLocal: [
        {
          type: 'list',
          name: 'wantedPrismaOrTypeOrmOrMongoose',
          message: 'Would you like to choose Prisma or Mongoose?',
          choices: ['Mongoose', 'Prisma'],
        }
      ],
    },
  
    Mysql: {
      jwt: [
        {
            type: 'list',
            name: 'wantedPrismaOrTypeOrmOrMongoose',
            message: 'Would you like to choose Prisma or TypeORM?',
            choices: ['TypeOrm', 'Prisma'],
        }
      ],
      oauth2: [
        {
            type: 'list',
            name: 'wantedPrismaOrTypeOrmOrMongoose',
            message: 'Would you like to choose Prisma or TypeORM?',
            choices: ['TypeOrm', 'Prisma'],
        }
      ],
      passportLocal: [
        {
            type: 'list',
            name: 'wantedPrismaOrTypeOrmOrMongoose',
            message: 'Would you like to choose Prisma or TypeORM?',
            choices: ['TypeOrm', 'Prisma'],
        }
      ],
    },
  
    Postgresql: {
      jwt: [
        {
            type: 'list',
            name: 'wantedPrismaOrTypeOrmOrMongoose',
            message: 'Would you like to choose Prisma or TypeORM?',
            choices: ['TypeOrm', 'Prisma'],
        }
      ],
      oauth2: [],
      passportLocal: [],
    },
  }
  