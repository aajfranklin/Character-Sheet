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
        boost: '-',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
        editing: false
    },
    {
        name: 'dummyName2',
        cost: '1',
        damage: '1d6',
        boost: '-',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
        editing: false
    },
    {
        name: 'dummyName3',
        cost: '1',
        damage: '1d6',
        boost: '-',
        saving: '1d6 + wis',
        effect: 'This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool This does something cool',
        editing: false
    }
];

const newAbility = {
    name: '',
    cost: '',
    damage: '',
    boost: '',
    saving: '',
    effect: ''
};

export const initialState = {
    pages: pages,
    ki: {
        abilities: kiAbilities,
        abilityEditCache: [],
        newAbility: {...newAbility},
        showAbilityForm: false,
    }
};
