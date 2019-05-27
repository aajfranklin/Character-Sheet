export const testPages = ['page1', 'page2', 'page3'];

export const testKiAbilities = [
    {
        name: 'dummyName1',
        cost: '1',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false
    },
    {
        name: 'dummyName2',
        cost: '1',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false
    },
    {
        name: 'dummyName3',
        cost: '1',
        damage: '1',
        boost: '-',
        saving: '1',
        effect: 'effect',
        editing: false
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
        newAbility: {...testNewAbility},
        showAbilityForm: false
    }
};

export default testState;
