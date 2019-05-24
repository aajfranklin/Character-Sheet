import { initialState } from '../model';

export default function appReducer(state = { ...initialState.app }, action) {
    switch (action.type) {
        default:
            return state;
    }
}
