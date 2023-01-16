declare namespace Express {
    export interface Request {
        container: any;
        targetUserInfo?: any;
        user: {
            session_name: string;
        };
    }
}
