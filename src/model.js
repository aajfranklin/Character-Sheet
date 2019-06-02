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
    pages,
    errorQueue: [],
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
