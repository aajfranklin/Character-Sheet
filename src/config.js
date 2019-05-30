let config = {
    apiGateway: {
        invokeUrl: process.env.REACT_APP_API_GATEWAY_INVOKE_URL,
        endpoints: {
            kiAbilities: '/kiabilities',
            stats: '/stats'
        }
    }
};

export default config;
