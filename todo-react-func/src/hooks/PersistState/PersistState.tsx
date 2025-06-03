import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import { getAccessToken } from '../../utils/cookies/cookies'
import { getItem, setItem } from '../../utils/localStore/localStore'

const PersistState = () => {
    const dispatch = useDispatch()
    const { filter } = useSelector((state: RootState) => state.todos)
    const token = getAccessToken()

    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (hasLoaded && !token) return

        const persistedFilterState = getItem('filter')

        if (persistedFilterState) {
            dispatch(setFilter(filter))
        }

        setHasLoaded(true)
    }, [token, dispatch, hasLoaded])

    useEffect(() => {
        if (hasLoaded) {
            setItem('filter', filter)
        }
    }, [filter, hasLoaded])

    return null
}

export default PersistState
