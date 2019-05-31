export const testPages = ['page1', 'page2', 'page3'];

export const testKiAbilities = [
    {
        name: 'dummyName1',
        cost: '1',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false,
        editValidation: {},
        uuid: '0'
    },
    {
        name: 'dummyName2',
        cost: '2',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false,
        editValidation: {},
        uuid: '1'
    },
    {
        name: 'dummyName3',
        cost: '3',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false,
        editValidation: {},
        uuid: '2'
    }
];

export const testState = {
    app: {
        pages: testPages,
        showError: false,
        errorMessage: undefined,
        stats: {
            kiAvailable: 3,
            kiTotal: 3
        },
        statCache: {
            stat: undefined,
            value: undefined
        },
        apiGatewayMockOutcome: ''
    },
    ki: {
        abilities: testKiAbilities,
        abilityCache: [],
        newAbility: {},
        abilityFormValidation: {},
        showAbilityForm: false,
    }
};

export default testState;
