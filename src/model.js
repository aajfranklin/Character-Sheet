const pages = [
  'Stats',
  'Inventory',
  'Weapons',
  'Ki',
  'Features',
  'Lore',
  'Map',
];

const initialState = {
  app: {
    errorMessage: undefined,
    pages,
    showError: false,
    stats: {},
    statCache: {
      stat: undefined,
      value: undefined,
    },
  },
  ki: {
    abilities: null,
    abilityCache: [],
    abilityFormValidation: {},
    newAbility: {},
    showAbilityForm: false,
  },
};

export default initialState;
