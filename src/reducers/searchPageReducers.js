let initialState = {
    signUpControl: false,
    isShortCutOpen: false,
    editShortCutOpen: null,
    searchText: ''
};

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_SIGN_UP':
            return {
                ...state,
                signUpControl: action.payload
            };
        case 'OPEN_SHORTCUT':
            return {
                ...state,
                isShortCutOpen: action.payload,
                editShortCutOpen: action.editShortCutOpen
            };
        case 'SEARCH':
            return {
                ...state,
                searchText: action.payload
            };
        default:
            return state
    }
};