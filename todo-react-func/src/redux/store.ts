import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import todoReducer from './reducers/todoReducer'
import { rootWatcher } from './sagas'

export type RootState = {
    todos: ReturnType<typeof todoReducer>
}

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    todos: todoReducer,
})

const store = createStore<RootState, any, any, any>(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
