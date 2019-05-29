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
        showError: false,
        errorMessage: '',
    },
    ki: {
        abilities: null,
        abilityEditCache: [],
        newAbility: {...newAbility},
        newAbilityIsValid: {name: true, cost: true, damage: true, boost: true, saving: true, effect: true},
        showAbilityForm: false,
    }
};
