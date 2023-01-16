import { AwilixContainer } from 'awilix';
import CookiesProps from './cookies.interface';
import TargetUserInfoProps from './infoUser.interface';
import InstagramInstanceProps from './instagram.interface';
import ConfigProps from './common.interface';

export interface Container extends AwilixContainer {
    sessions: [];
    cookiesUtil: CookiesProps;
    config: ConfigProps;
}

export interface ScopeProps extends AwilixContainer {
    instance: InstagramInstanceProps;
}

export interface ContainerInstance extends Container {
    targetUserInfo: TargetUserInfoProps;
    scope: ScopeProps;
}
