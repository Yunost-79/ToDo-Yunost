import { Navigate, Outlet } from 'react-router-dom'
import { PATHS, TEST_TOKEN } from '../globalVariables/pathsVariables'

const PrivateRoutes = () => {
    const isAuth = { token: TEST_TOKEN }

    return isAuth.token ? <Outlet /> : <Navigate to={PATHS.SIGN_IN} replace />
}

export default PrivateRoutes
