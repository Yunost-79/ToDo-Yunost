import { all } from 'redux-saga/effects'
import { authWatcher } from './authSaga'
import { todoWatcher } from './todoSaga'
import { watchTodoStateChange } from './tokenSaga'

export function* rootWatcher() {
    yield all([authWatcher(), todoWatcher(), watchTodoStateChange()])
}
