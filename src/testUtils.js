const testPages = ['page1', 'page2', 'page3'];

const testKiAbilities = [
  {
    name: 'dummyName1',
    cost: '1',
    damage: '1',
    boost: '-',
    saving: '1',
    effect: 'effect',
    editing: false,
    editValidation: {},
    uuid: '0',
  },
  {
    name: 'dummyName2',
    cost: '2',
    damage: '1',
    boost: '-',
    saving: '1',
    effect: 'effect',
    editing: false,
    editValidation: {},
    uuid: '1',
  },
  {
    name: 'dummyName3',
    cost: '3',
    damage: '1',
    boost: '-',
    saving: '1',
    effect: 'effect',
    editing: false,
    editValidation: {},
    uuid: '2',
  },
];

export const testState = {
  app: {
    pages: testPages,
    errorQueue: [],
    stats: {
      kiAvailable: 3,
      kiTotal: 3,
    },
    statCache: {
      stat: undefined,
      value: undefined,
    },
    apiGatewayMockOutcome: '',
  },
  ki: {
    abilities: testKiAbilities,
    abilityCache: [],
    newAbility: {},
    abilityFormValidation: {},
    showAbilityForm: false,
  },
};

export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
