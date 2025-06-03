import { all } from 'redux-saga/effects'
import { authWatcher } from './authSaga'
import { todoWatcher } from './todoSaga'
import { userWatcher } from './userSaga'

export function* rootWatcher() {
    yield all([authWatcher(), todoWatcher(), userWatcher()])
}
