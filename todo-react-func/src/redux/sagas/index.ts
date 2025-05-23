import { all } from 'redux-saga/effects'
import { authWatcher } from './authSaga'
import { todoWatcher } from './todoSaga'

export function* rootWatcher() {
    yield all([authWatcher(), todoWatcher()])
}
