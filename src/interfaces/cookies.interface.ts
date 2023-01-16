import { InstagramInstanceProps } from './container.interface';

interface CookiesProps {
    saveCookies(
        username: string,
        cookies: any,
        state: any
    ): () => void;

    loadCookies(
        ig: InstagramInstanceProps,
        username: string,
        silentMode?: boolean
    ): Promise<boolean>;

    removeCookie(
        ig: InstagramInstanceProps,
        cookie_name?: string | null
    ): Promise<void>;
}

export default CookiesProps;
