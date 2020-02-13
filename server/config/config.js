import { config } from 'dotenv';

config();

export default {
  jwtSecret: process.env.SECRET,

};
