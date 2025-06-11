import { Box, Modal, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type ModalWindowProps = {
    className?: string
    open: boolean
    handleClose: () => void
    children?: ReactNode
}

const ModalWindow: FC<ModalWindowProps> = ({
    className,
    open,
    handleClose,
    children,
    ...props
}) => {
    return (
        <StyledModal open={open} onClose={handleClose} className={className} {...props}>
            <StyledBox>{children}</StyledBox>
        </StyledModal>
    )
}

const StyledModal = styled(Modal)({})

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.default,
    padding: '24px',
    borderRadius: '8px',
    outline: 'none',
    maxWidth: '80%',
}))

export default ModalWindow
