let initialState = {
    signUpControl: false,
    isShortCutOpen: false,
    editShortCutOpen: null,
    searchText: '',
    openImage: false,
    image: null
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
        case 'OPEN_IMAGE':
            return {
                ...state,
                openImage: action.payload,
                image: action.image
            };
        default:
            return state
    }
};