import testState from '../../../../../testUtils/testState'

export const apiGatewayDeleteAbility = (uuid) => {
    if (uuid) {
        return uuid === 'deleteNetworkFailure' ? Promise.reject('testDeleteReject')
            : Promise.resolve({data: {ability: {uuid: 'uuid'}}});
    } else {
        return Promise.resolve({data: {error: 'someDynamoDbError'}})
    }
};

export const apiGatewayGetAbilities = () => {
    const getAbilitiesResult = {
        data: {
            abilities: testState.ki.abilities
        }
    };

    return Promise.resolve(getAbilitiesResult);
};

export const apiGatewayGetAbility = (uuid) => {
    const testAbility = {uuid};
    const getAbilityResult = {
        data: {
            ability: testAbility
        }
    };

    if (uuid === 'getNetworkFailure') {
        return Promise.reject('testGetReject');
    } else if (uuid === 'getDynamoFailure') {
        return Promise.resolve({data: {ability: {uuid: ''}}});
    } else {
        return Promise.resolve(getAbilityResult);
    }
};

export const apiGatewayPutAbility = (ability) => {
    if (ability.uuid) {
        return ability.uuid === 'putNetworkFailure' ? Promise.reject('testPutReject') : Promise.resolve({data: {}});
    } else {
        return Promise.resolve({data: {error: 'someDynamoDbError'}})
    }
};
