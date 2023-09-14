import { combineReducers, createStore } from "redux";
import { searchReducer } from "./searchPageReducers";
import { Provider } from "react-redux";

export const SearchReducer = ({children}) => {
    const store = createStore(
        combineReducers({
            searchReducer: searchReducer
        })
    );
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}