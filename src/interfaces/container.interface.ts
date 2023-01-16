import { AwilixContainer } from 'awilix';
import { IgApiClient } from 'instagram-private-api';
import CookiesProps from './cookies.interface';

export type ConfigProps = {
    hostName: string;
    web: {
        port: string;
    },
    // api: {},
    webhook: {
        active: boolean;
        url: string;
    },
}

export type ClientProps = {
    // instance: Whatsapp;
    session: any;
}

export interface Container extends AwilixContainer {
    sessions: [];
    cookiesUtil: CookiesProps;
    config: ConfigProps
}

export interface InstagramInstanceProps extends IgApiClient {
    loggedInUser?: any;
    shortid?: string;
    db?: any;
}

export interface ScopeProps extends AwilixContainer {
    ig: InstagramInstanceProps;
}

export interface ContainerInstance extends Container {
    scope: ScopeProps;
}
