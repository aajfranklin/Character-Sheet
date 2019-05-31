import testState from '../testUtils/testState';
import { deepCopy } from '../testUtils/testHelpers';

function getMockOutcome() {
    const outcome = deepCopy(testState.app.apiGatewayMockOutcome);
    testState.app.apiGatewayMockOutcome = '';
    return outcome;
}
export const apiGatewayGetAll = (resource) => {
    let stateGroup;
    let stateItem;

    switch (resource) {
        case 'stats': {
            stateGroup = 'app';
            stateItem = 'stats';
            break;
        }
        case 'kiAbilities': {
            stateGroup = 'ki';
            stateItem = 'abilities';
            break
        }
        default: {
            stateGroup = 'app';
            stateItem = '';
        }
    }

    const getAllResult = {
        data: {
            [stateItem]: testState[stateGroup][stateItem],
            count: Object.keys(testState[stateGroup][stateItem]).length
        }
    };

    switch (getMockOutcome()) {
        case 'apiGatewayError': {
            return Promise.reject('testGetAllReject');
        }
        case 'dynamoDbError': {
            return Promise.resolve({data: {[stateItem]: [], count: ''}});
        }
        case 'noneFound': {
            return Promise.resolve({data: {[stateItem]: [], count: '0'}});
        }
        default: {
            return Promise.resolve(getAllResult);
        }
    }
};

export const apiGatewayDelete = (resource, id) => {
    let stateItem;
    let attribute;

    switch (resource) {
        case 'kiAbilities': {
            stateItem = 'ability';
            attribute = 'uuid';
            break
        }
        default: {
            stateItem = '';
            attribute = '';
        }
    }


    switch (getMockOutcome()) {
        case 'apiGatewayError': {
            return Promise.reject('testDeleteReject');
        }
        case 'dynamoDbError': {
            return Promise.resolve({data: {error: 'dynamoDbError'}})
        }
        default: {
            return Promise.resolve({data: {[stateItem]: {[attribute]: id}}});
        }
    }
};

export const apiGatewayPut = () => {
    switch (getMockOutcome()) {
        case 'apiGatewayError': {
            return Promise.reject('testPutReject');
        }
        case 'dynamoDbError': {
            return Promise.resolve({data: {error: 'someDynamoDbError'}})
        }
        default: {
            return Promise.resolve({data: {}});
        }
    }
};
