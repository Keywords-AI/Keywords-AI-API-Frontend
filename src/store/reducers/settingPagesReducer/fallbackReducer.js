import { TOGGLE_FALLBACK, TOGGLE_SYSTEM_FALLBACK } from 'src/store/actions';

const initialState = {
    isFallbackEnabled: false,
    systemFallbackenabled: true,
};

const fallbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FALLBACK:
            return {
                ...state,
                isFallbackEnabled: action.payload,
            };
        case TOGGLE_SYSTEM_FALLBACK:
            return {
                ...state,
                systemFallbackenabled: action.payload,
            };
        default:
            return state;
    }
};

export default fallbackReducer;
