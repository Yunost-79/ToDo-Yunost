import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import authReducer from './reducers/auth/authReducer'
import todoReducer from './reducers/todos/todoReducer'
import { rootWatcher } from './sagas'

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
