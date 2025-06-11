import { styled, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import GhostIcon from '../../UI/Icons/GhostIcon'

type EmptyBlockProps = {
    title?: string
}

const EmptyBlock: FC<EmptyBlockProps> = ({ title }) => {
    const theme = useTheme()

    return (
        <StyledEmptyBlock>
            <GhostIcon color={theme.palette.text.secondary} />
            <StyledTypography>{title}</StyledTypography>
        </StyledEmptyBlock>
    )
}

const StyledEmptyBlock = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    margin: '30px 0',

    '& svg': {
        width: '80px',
        height: '80px',
        opacity: 0.75,
    },
})

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}))

export default EmptyBlock
