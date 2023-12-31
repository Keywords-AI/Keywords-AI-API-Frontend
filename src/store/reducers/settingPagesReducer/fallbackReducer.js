import { TOGGLE_FALLBACK } from '../../actions/settingPagesActions/fallbackAction';

const initialState = {
    isFallbackEnabled: false,
};

const fallbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FALLBACK:
            return {
                ...state,
                isFallbackEnabled: action.payload,
            };
        default:
            return state;
    }
};

export default fallbackReducer;
