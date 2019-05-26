import config from './config';

const apiGatewayClientFactory = require('aws-api-gateway-client').default;
const baseUrl = config.apiGateway.invokeUrl;

const getApiGatewayClient = (endpoint) => {
    const gatewayClientConfig = {
        invokeUrl: baseUrl + endpoint
    };

    return apiGatewayClientFactory.newClient(gatewayClientConfig);
};

export default getApiGatewayClient;
