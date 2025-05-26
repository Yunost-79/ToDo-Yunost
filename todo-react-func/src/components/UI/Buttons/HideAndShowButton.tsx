import { FC } from 'react'
import HideIcon from '../Icons/HideIcon'
import ShowIcon from '../Icons/ShowIcon'

type HideAndShowButtonProps = {
    show: boolean
    error: boolean | undefined
}

const HideAndShowButton: FC<HideAndShowButtonProps> = ({ show, error }) => {
    return <>{show ? <HideIcon error={error} /> : <ShowIcon error={error} />}</>
}

export default HideAndShowButton
