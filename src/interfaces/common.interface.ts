export type ConfigProps = {
    hostName: string;
    web: {
        port: string;
    },
    webhook: {
        active: boolean;
        url: string;
    },
}

export default ConfigProps;
