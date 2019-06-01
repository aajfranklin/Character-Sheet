import config from './config';

const apiGatewayClientFactory = require('aws-api-gateway-client').default;

const baseUrl = config.apiGateway.invokeUrl;

const getApiGatewayClient = (resource, id) => {
  const endpoint = config.apiGateway.endpoints[resource];

  const gatewayClientConfig = {
    invokeUrl: `${baseUrl + endpoint}/${id}`,
  };

  return apiGatewayClientFactory.newClient(gatewayClientConfig);
};

export const apiGatewayDelete = (resource, id) => {
  const deleteClient = getApiGatewayClient(resource, id);
  return deleteClient.invokeApi({}, '', 'DELETE');
};

export const apiGatewayGetAll = (resource) => {
  const getAllClient = getApiGatewayClient(resource, '');
  return getAllClient.invokeApi({}, '', 'GET');
};

export const apiGatewayPut = (resource, id, item) => {
  const putAbilityClient = getApiGatewayClient(resource, id);
  return putAbilityClient.invokeApi({}, '', 'PUT', {}, item);
};
