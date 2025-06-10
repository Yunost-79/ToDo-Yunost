import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { FC } from 'react'

type ShowIconProps = {
    isShow?: boolean
    color?: string
    error?: boolean | undefined
}

const ShowIcon: FC<ShowIconProps> = ({ isShow, color, error }) => {
    return isShow ? (
        <VisibilityIcon className={error ? 'error' : ''} />
    ) : (
        <VisibilityOffIcon className={error ? 'error' : ''} />
    )
}

export default ShowIcon
