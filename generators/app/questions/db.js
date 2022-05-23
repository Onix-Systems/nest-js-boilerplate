module.exports = {
  jwt: [
    {
      type: 'list',
      name: 'db',
      message: 'Choose db for your api.(Sql - Typeorm, Mongo - Mongoose)',
      choices: ['Mongodb', 'Mysql', 'Postgresql'],
    },
  ],
  oauth2: [
    {
      type: 'list',
      name: 'db',
      message: 'Choose db for your api.(Sql - Typeorm, Mongo - Mongoose)',
      choices: ['Mongodb', 'Mysql'],
    },
  ],
  passportLocal: [
    {
      type: 'list',
      name: 'db',
      message: 'Choose db for your api.(Sql - Typeorm, Mongo - Mongoose)',
      choices: ['Mongodb', 'Mysql'],
    },
  ],
}
