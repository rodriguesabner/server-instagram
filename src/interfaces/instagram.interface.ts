import { IgApiClient } from 'instagram-private-api';

export interface InstagramInstanceProps extends IgApiClient {
    loggedInUser?: any;
    shortid?: string;
    db?: any;
}

export default InstagramInstanceProps;
