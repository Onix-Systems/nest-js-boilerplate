import crypto from 'crypto';

const authConstants = {
  verifyEmail: {
    token: {
      iv: crypto.randomBytes(16),
      key: crypto.scryptSync(
        process.env.PASSPORT_SESSION_SECRET || 'key',
        'salt',
        32,
      ),
    },
  },
};

export default authConstants;
