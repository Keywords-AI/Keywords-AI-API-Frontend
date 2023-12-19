const initialState =  [
    {
        name: 'Page A',
        usage: 0,
    },
    {
        name: 'Page B',
        usage: 0,
    },
    {
        name: 'Page C',
        usage: 0,
    },
];

export default function usageDataReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USAGE_DATA':
            return action.payload;
        default:
            return state;
    }
}