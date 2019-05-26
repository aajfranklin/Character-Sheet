import getApiGatewayClient from "../../../../apiGatewayClient";
import config from "../../../../config";

const apiGatewayClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities);

export const apiGatewayDeleteAbility = (uuid) => {
    const deleteAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + uuid);
    return deleteAbilityClient.invokeApi({}, '', 'DELETE');
};

export const apiGatewayGetAbilities = () => {
    return apiGatewayClient.invokeApi({}, '', 'GET');
};

export const apiGatewayGetAbility = (uuid) => {
    const getAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + uuid);
    return getAbilityClient.invokeApi({}, '', 'GET');
};

export const apiGatewayPostAbility = (ability) => {
    return apiGatewayClient.invokeApi({}, '', 'POST', {}, ability);
};
