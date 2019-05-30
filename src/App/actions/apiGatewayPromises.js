import getApiGatewayClient from "../../apiGatewayClient";
import config from "../../config";

export const apiGatewayGetStats = () => {
    const getStatsClient = getApiGatewayClient(config.apiGateway.endpoints.stats);
    return getStatsClient.invokeApi({}, '', 'GET');
};


export const apiGatewayPutStat = (stat, value) => {
    const putStatClient = getApiGatewayClient(config.apiGateway.endpoints.stats + "/" + stat);
    return putStatClient.invokeApi({}, '', 'PUT', {}, {value});
};
