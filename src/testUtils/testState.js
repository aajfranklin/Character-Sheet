export const testPages = ['page1', 'page2', 'page3'];

export const testKiAbilities = [
    {
        name: 'dummyName1',
        cost: '1',
        damage: '1',
        saving: '1',
        effect: 'effect',
    },
    {
        name: 'dummyName2',
        cost: '1',
        damage: '1',
        saving: '1',
        effect: 'effect',
    },
    {
        name: 'dummyName3',
        cost: '1',
        damage: '1',
        saving: '1',
        effect: 'effect',
    }
];

export const testNewAbility = {
    name: '',
    cost: '',
    damage: '',
    saving: '',
    effect: '',
};

export const testState = {
    pages: testPages,
    ki: {
        abilities: testKiAbilities,
        abilityEditCache: [],
        showAbilityForm: false,
        newAbility: {...testNewAbility}
    }
};
