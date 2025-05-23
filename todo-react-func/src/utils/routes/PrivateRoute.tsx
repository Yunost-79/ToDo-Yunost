import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { RootState } from '../../redux/store'

const PrivateRoutes = () => {
    const { token } = useSelector((state: RootState) => state.auth)

    return token ? <Outlet /> : <Navigate to={PATHS.SIGN_IN} replace />
}

export default PrivateRoutes
