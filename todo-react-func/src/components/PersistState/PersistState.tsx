import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'

const PersistState = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: RootState) => state.todos)

    // const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    // useEffect(() => {
    //     if (hasLoaded) return

    //     const serializedState = localStorage.getItem('todoState')

    //     if (serializedState && !hasLoaded) {
    //         const parsedState = JSON.parse(serializedState)
    //         dispatch(setState(parsedState))
    //         setHasLoaded(true)
    //     }
    // }, [dispatch, hasLoaded])

    // useEffect(() => {
    //     if (hasLoaded) {
    //         const serializedState = JSON.stringify(todos)
    //         localStorage.setItem('todoState', serializedState)
    //     }
    // }, [todos, hasLoaded])
    const isInitialLoad = useRef(true)

    useEffect(() => {
        if (isInitialLoad.current) {
            const serializedState = localStorage.getItem('todoState')
            if (serializedState) {
                dispatch(setState(JSON.parse(serializedState)))
            }
            isInitialLoad.current = false
        } else {
            localStorage.setItem('todoState', JSON.stringify(todos))
        }
    }, [dispatch, todos])

    return null
}

export default PersistState
