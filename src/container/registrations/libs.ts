import { asFunction, asValue, AwilixContainer } from 'awilix';
import jwt from 'jsonwebtoken';
import querystring from 'query-string';
import { EventEmitter } from 'events';
import CookiesUtils from '../utils/cookies';

const registerLibs = (container: AwilixContainer, config: any) => {
  container.register({
    querystring: asValue(querystring),
    config: asValue(config),
    jwt: asValue(jwt),
    eventEmitter: asFunction(() => EventEmitter),
    cookiesUtil: asValue(new CookiesUtils()),
  });
};

export default registerLibs;
