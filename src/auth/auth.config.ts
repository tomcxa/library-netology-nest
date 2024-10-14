import 'dotenv/config';

export const authConfig = {
  jwtSecret: process.env.JWT_ACCESS_SECRET,
};
