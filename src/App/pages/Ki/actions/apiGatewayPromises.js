import getApiGatewayClient from "../../../../apiGatewayClient";
import config from "../../../../config";

export const apiGatewayDeleteAbility = (uuid) => {
    const deleteAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + uuid);
    return deleteAbilityClient.invokeApi({}, '', 'DELETE');
};

export const apiGatewayGetAbilities = () => {
    const getAbilitiesClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities);
    return getAbilitiesClient.invokeApi({}, '', 'GET');
};

export const apiGatewayGetAbility = (uuid) => {
    const getAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + uuid);
    return getAbilityClient.invokeApi({}, '', 'GET');
};

export const apiGatewayPutAbility = (ability) => {
    const putAbilityClient = getApiGatewayClient(config.apiGateway.endpoints.kiAbilities + "/" + ability.uuid);
    return putAbilityClient.invokeApi({}, '', 'PUT', {}, ability);
};
