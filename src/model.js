const pages = [
    'Stats',
    'Inventory',
    'Weapons',
    'Ki',
    'Features',
    'Lore',
    'Map'
];

export const initialState = {
    app: {
        errorMessage: undefined,
        pages: pages,
        showError: false,
        stats: {},
        statCache: {
            stat: undefined,
            value: undefined
        }
    },
    ki: {
        abilities: null,
        abilityCache: [],
        abilityFormValidation: {},
        newAbility: {},
        showAbilityForm: false,
    }
};
