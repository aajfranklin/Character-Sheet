import getApiGatewayClient from "../../apiGatewayClient";
import config from "../../config";

export const apiGatewayGetStats = () => {
    const getStatsClient = getApiGatewayClient(config.apiGateway.endpoints.stats);
    return getStatsClient.invokeApi({}, '', 'GET');
};

// export const apiGatewayGetAbility = (uuid) => {
//     const getAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + uuid);
//     return getAbilityClient.invokeApi({}, '', 'GET');
// };
//
// export const apiGatewayPutAbility = (ability) => {
//     const putAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + ability.uuid);
//     return putAbilityClient.invokeApi({}, '', 'PUT', {}, ability);
// };
