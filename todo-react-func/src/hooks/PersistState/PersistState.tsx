import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodoState } from '../../globalVariables/typesVariables'
import { setState } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import { getItem, setItem } from '../../utils/localStore/localStore'

const PersistState = () => {
    const dispatch = useDispatch()
    const todosState: TodoState = useSelector((state: RootState) => state.todos)

    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (hasLoaded) return

        const persistedState = getItem('todoState')

        if (persistedState) {
            dispatch(setState(persistedState))
        }

        setHasLoaded(true)
    }, [dispatch, hasLoaded])

    useEffect(() => {
        if (hasLoaded) {
            setItem('todoState', todosState)
        }
    }, [todosState, hasLoaded])

    return null
}

export default PersistState
