import { all } from 'redux-saga/effects'
import { todoWatcher } from './todoSaga'

export function* rootWatcher() {
    yield all([todoWatcher()])
}
