import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import authReducers from './reducers/auth/authReducers'
import todoReducers from './reducers/todos/todoReducers'
import userReducers from './reducers/user/userReducers'
import { rootWatcher } from './sagas'

const rootReducer = combineReducers({
    todos: todoReducers,
    auth: authReducers,
    user: userReducers,
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
