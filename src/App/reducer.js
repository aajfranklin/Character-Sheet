import { initialState } from '../model.js';

export default function appReducer(state = { ...initialState.app }, action) {
    switch (action.type) {
        default:
            return state;
    }
}
