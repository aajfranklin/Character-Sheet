const pages = [
    'Stats',
    'Weapons',
    'Ki',
    'Abilities',
    'Lore',
    'Map'
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
    app: {
        pages: pages,
    },
    ki: {
        abilities: null,
        abilityEditCache: [],
        newAbility: {...newAbility},
        showAbilityForm: false,
    }
};
