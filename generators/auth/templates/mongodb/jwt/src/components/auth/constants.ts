const jwtConstants = {
  secret: '<%= config.jwtSecret %>',
  refreshTokenExpirationTime: '<%= config.refreshTokenExpirationTime %>',
  accessTokenExpirationTime: '<%= config.accessTokenExpirationTime %>',
};

export default jwtConstants;
