import { FC } from 'react'

type CloseIconProps = {
    color?: string
}

const CloseIcon: FC<CloseIconProps> = ({ color = 'currentColor' }) => {
    return (
        <svg width="800px" height="800px" viewBox="-0.5 0 25 25">
            <path
                d="M3 21.32L21 3.32001"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 3.32001L21 21.32"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CloseIcon
