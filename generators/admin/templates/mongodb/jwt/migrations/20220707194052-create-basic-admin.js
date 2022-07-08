module.exports.up = async (db) => {
  await db.collection('users').insertOne({
    email: 'admin@test.com',
    password: '$2a$10$JBhu1rHrGpk.wx.F6Cta1ujDgENg1XOoZKyeQCS77ZrEMaSsocYQ6',
    roles: ['user', 'admin'],
    verified: true,
  });
};

module.exports.down = async (db) => {
  await db.collection('users').deleteOne({
    email: 'admin@test.com',
  });
};
