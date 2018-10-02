import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const initialState = {};

const middleware = [thunk];

// This will add middleware in array to apply
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),

        // If you use Mac and Safari, do not use this code below:
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
);


export default store;