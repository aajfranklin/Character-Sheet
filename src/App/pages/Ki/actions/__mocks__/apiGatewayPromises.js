import testState from '../../../../../testUtils/testState'

export const apiGatewayDeleteAbility = (id) => {
    return Promise.resolve();
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

    return Promise.resolve(getAbilityResult);
};

export const apiGatewayPutAbility = (ability) => {
    return ability.uuid ? Promise.resolve({data: {}}) : Promise.resolve({data: {error: 'someError'}});
};
