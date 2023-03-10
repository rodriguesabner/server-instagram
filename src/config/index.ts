/* eslint-disable import/no-dynamic-require,@typescript-eslint/no-var-requires */
import dotenv from 'dotenv';
import path from 'path';
// @ts-ignore
import { version } from '../../package.json';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(path.join(__dirname, 'environments', ENV));

const configEnv = {
  [ENV]: true,
  env: ENV,
  name: 'server-instagram',
  secretKey: process.env.SECRET_KEY || 'change',
  version,
  ...envConfig,
};

export default configEnv.default || configEnv;
