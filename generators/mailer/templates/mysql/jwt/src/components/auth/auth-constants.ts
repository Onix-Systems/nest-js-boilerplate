const authConstants = {
  jwt: {
    secret: '<%= config.jwtSecret %>',
    expirationTime: {
      accessToken: '<%= config.refreshTokenExpirationTime %>',
      refreshToken: '<%= config.accessTokenExpirationTime %>',
    },
    secrets: {
      accessToken: '<%= config.accessTokenSecret %>',
      refreshToken: '<%= config.refreshTokenSecret %>',
    },
  },
    mailer: {
    verifyEmail: {
      subject: 'Email Verification',
      template: 'verify-password',
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
