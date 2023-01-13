const authConstants = {
  jwt: {
    secret: '<%= config.jwtSecret %>',
    expirationTime: {
      accessToken: '<%= config.accessTokenExpirationTime %>',
      refreshToken: '<%= config.refreshTokenExpirationTime %>',
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
