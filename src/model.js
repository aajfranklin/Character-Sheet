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
        errorMessage: '',
        pages: pages,
        showError: false,
    },
    ki: {
        abilities: null,
        abilityEditCache: [],
        abilityFormValidation: {},
        available: 3,
        newAbility: {...newAbility},
        showAbilityForm: false,
        total: 3
    }
};
