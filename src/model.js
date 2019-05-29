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
        abilityFormValidation: {name: true, cost: true, damage: true, boost: true, saving: true, effect: true},
        newAbility: {...newAbility},
        showAbilityForm: false,
    }
};
