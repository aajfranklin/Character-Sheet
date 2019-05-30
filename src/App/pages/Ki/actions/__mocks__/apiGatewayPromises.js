import testState from '../../../../../testUtils/testState';
import { deepCopy } from '../../../../../testUtils/testHelpers';

export const apiGatewayDeleteAbility = (uuid) => {
    if (uuid) {
        return uuid === 'deleteNetworkFailure' ? Promise.reject('testDeleteReject')
            : Promise.resolve({data: {ability: {uuid: 'uuid'}}});
    } else {
        return Promise.resolve({data: {ability: {uuid: ''}}})
    }
};

export const apiGatewayGetAbilities = () => {
    const getAbilitiesResult = {
        data: {
            abilities: testState.ki.abilities,
            count: testState.ki.abilities.length
        }
    };

    const result = deepCopy(testState.app.mockGetAllNetworkResult);
    testState.app.mockGetAllNetworkResult = '';

    if (result === 'getAllNetworkFailure') {
        return Promise.reject('testGetAllReject');
    } else if (result === 'getAllDynamoFailure') {
        return Promise.resolve({data: {abilities: getAbilitiesResult.data.abilities, count: ''}});
    } else if (result === 'noneFound') {
        return Promise.resolve({data: {abilities: [], count: '0'}});
    } else {
        return Promise.resolve(getAbilitiesResult);
    }
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
