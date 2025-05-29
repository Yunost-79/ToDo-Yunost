import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodoState, UserState } from '../../globalVariables/typesVariables'
import { setTodoState } from '../../redux/actions/todoActions'
import { setUserState } from '../../redux/actions/userActions'
import { RootState } from '../../redux/store'
import { getAccessToken } from '../../utils/cookies/cookies'
import { getItem, setItem } from '../../utils/localStore/localStore'

const PersistState = () => {
    const dispatch = useDispatch()
    const todosState = useSelector((state: RootState) => state.todos)
    const userState: UserState = useSelector((state: RootState) => state.user)
    const token = getAccessToken()

    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (hasLoaded && !token) return

        const persistedTodoState = getItem('todoState')
        const persistedUserState = getItem('userState')

        if (persistedTodoState) {
            dispatch(setTodoState(persistedTodoState))
        }
        if (persistedUserState) {
            dispatch(setUserState(persistedUserState))
        }

        setHasLoaded(true)
    }, [dispatch, hasLoaded])

    useEffect(() => {
        if (hasLoaded) {
            setItem('todoState', todosState)
            setItem('userState', userState)
        }
    }, [todosState, userState, hasLoaded])

    return null
}

export default PersistState
