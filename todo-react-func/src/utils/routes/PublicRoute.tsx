import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { getAccessToken } from '../cookies/cookies'

const PublicRoutes = () => {
    const token = getAccessToken()


    return token ? <Navigate to={PATHS.MAIN} replace /> : <Outlet />
}

export default PublicRoutes
