import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { RootState } from '../../redux/store'

const PublicRoutes = () => {
    const { token } = useSelector((state: RootState) => state.auth)

    return token ? <Navigate to={PATHS.MAIN} replace /> : <Outlet />
}

export default PublicRoutes
