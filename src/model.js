const pages = [
    'Stats',
    'Weapons',
    'Ki',
    'Abilities',
    'Lore',
    'Map'
];

const kiAbilities = [
    {
        name: 'dummyName1',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        name: 'dummyName2',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    },
    {
        name: 'dummyName3',
        cost: '1',
        damage: '1d6',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
    }
];

const newAbility = {
    name: '',
    cost: '',
    damage: '',
    saving: '',
    effect: ''
};

export const initialState = {
    pages: pages,
    ki: {
        abilities: kiAbilities,
        showAbilityForm: false,
        newAbility: {...newAbility}
    }
};
