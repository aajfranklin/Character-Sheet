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

export const testNewAbility = {
    name: '',
    cost: '',
    damage: '',
    boost: '',
    saving: '',
    effect: '',
};

export const testState = {
    app: {
        pages: testPages,
        showError: false,
        errorMessage: '',
    },
    ki: {
        abilities: testKiAbilities,
        abilityEditCache: [],
        available: 3,
        newAbility: {...testNewAbility},
        abilityFormValidation: {},
        showAbilityForm: false,
        total: 3,
        mockGetAbilitiesNetworkResult : null
    }
};

export default testState;
