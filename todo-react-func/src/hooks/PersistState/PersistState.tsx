import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModeTheme } from '../../redux/actions/themeActions'
import { setFilter } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import { getAccessToken } from '../../utils/cookies/cookies'
import { getItem, setItem } from '../../utils/localStore/localStore'

const PersistState = () => {
    const dispatch = useDispatch()
    const { filter } = useSelector((state: RootState) => state.todos)
    const { modeTheme } = useSelector((state: RootState) => state.theme)
    const token = getAccessToken()

    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (hasLoaded && !token) return

        const persistedFilterState = getItem('filter')

        if (persistedFilterState) {
            dispatch(setFilter(persistedFilterState))
        }

        const persistModeState = getItem('modeTheme')

        if (persistModeState) {
            dispatch(setModeTheme(persistModeState))
        }
        setHasLoaded(true)
    }, [token, dispatch, hasLoaded, filter, modeTheme])

    useEffect(() => {
        if (hasLoaded) {
            setItem('filter', filter)
            setItem('modeTheme', modeTheme)
        }
    }, [filter, modeTheme, hasLoaded])

    return null
}

export default PersistState
