import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModeTheme } from '../../../redux/actions/themeActions'
import { RootState } from '../../../redux/store'

type ChangeModeButtonProps = {
    children?: ReactNode
}

const ChangeModeButton: FC<ChangeModeButtonProps> = ({ children, ...props }) => {
    const dispatch = useDispatch()
    const { modeTheme } = useSelector((state: RootState) => state.theme)

    const toggleChangeMode = () => {
        dispatch(setModeTheme(!modeTheme))
    }

    return (
        <StyledChangeModeButton onClick={() => toggleChangeMode()} {...props}>
            {modeTheme ? <LightModeIcon /> : <DarkModeIcon />}
        </StyledChangeModeButton>
    )
}

const StyledChangeModeButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    top: '10px',
    left: '10px',
    padding: '5px',
    borderRadius: '50%',
    color: theme.palette.btn.main,

    '&:hover': {
        backgroundColor: theme.palette.btn.support,
        opacity: 0.9,
    },
}))

export default ChangeModeButton
