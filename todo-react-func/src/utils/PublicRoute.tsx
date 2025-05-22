import { Navigate, Outlet } from 'react-router-dom'
import { PATHS, TEST_TOKEN } from '../globalVariables/pathsVariables'

const PublicRoutes = () => {
    const isAuth = { token: TEST_TOKEN }

    return isAuth.token ? <Navigate to={PATHS.MAIN} replace /> : <Outlet />
}

export default PublicRoutes
