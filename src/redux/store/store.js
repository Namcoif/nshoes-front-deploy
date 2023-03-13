import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/userReducers'
import pageReducers from '../reducers/pageReducers'

const rootReducers = combineReducers({
    user: userReducers,
    page: pageReducers
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk)))

export default store;