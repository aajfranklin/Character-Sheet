import testState from '../../../testUtils/testState';
import { deepCopy } from '../../../testUtils/testHelpers';

export const apiGatewayGetStats = () => {
    const getStatsResult = {
        data: {
            stats: testState.app.stats,
            count: Object.keys(testState.app.stats).length
        }
    };

    const result = deepCopy(testState.app.mockGetAllNetworkResult);
    testState.app.mockGetAllNetworkResult = '';

    if (result === 'getAllNetworkFailure') {
        return Promise.reject('testGetAllReject');
    } else if (result === 'getAllDynamoFailure') {
        return Promise.resolve({data: {stats: getStatsResult.data.stats, count: ''}});
    } else if (result === 'noneFound') {
        return Promise.resolve({data: {stats: {}, count: '0'}});
    } else {
        return Promise.resolve(getStatsResult);
    }
};

export const apiGatewayPutStat = (stat, value) => {
    if (value) {
        return value === 'putNetworkFailure' ? Promise.reject('testPutReject') : Promise.resolve({data: {}});
    } else {
        return Promise.resolve({data: {error: 'someDynamoDbError'}})
    }
};
