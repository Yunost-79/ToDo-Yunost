import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { getAccessToken } from '../cookies/cookies'

const PrivateRoutes = () => {
    const token = getAccessToken()

    return token ? <Outlet /> : <Navigate to={PATHS.SIGN_IN} replace />
}

export default PrivateRoutes
