import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './index'


const middleware = [thunk];

const initialState = {}

/**
 * create store takes in three arguments 
 * 
 * the reducer function 
 * the initial state object
 * applyMiddleware
 */
const store = createStore( 
    rootReducer ,
    initialState , 
    compose( 
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

export default store;