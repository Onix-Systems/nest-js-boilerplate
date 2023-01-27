const authConstants = {
  jwt: {
    secret: 'superSecurity',
    expirationTime: {
      accessToken: '1d',
      refreshToken: '7d',
    },
  },
  redis: {
    expirationTime: {
      jwt: {
        accessToken: 86400, // 1d
        refreshToken: 604800, // 7d
      },
    },
  },
};

export default authConstants;
