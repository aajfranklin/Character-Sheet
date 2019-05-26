import testState from '../../../../../testUtils/testState'

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
export const apiGatewayPostAbility = (ability) => {
    return Promise.resolve();
};
