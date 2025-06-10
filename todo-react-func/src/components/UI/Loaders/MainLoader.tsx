import { styled } from '@mui/material'

const MainLoader = () => {
    return <StyledMainLoader></StyledMainLoader>
}

const StyledMainLoader = styled('div')(({ theme }) => ({
    aspectRatio: 1,
    borderRadius: '50%',
    border: `5px solid ${theme.palette.loader.primary}`,
    borderRightColor: theme.palette.loader.tertiary,
    animation: 'l2m 1s infinite linear',

    '@keyframes l2': {
        to: {
            transform: 'rotate(1turn)',
        },
    },
}))

// `
//     aspect-ratio: 1;
//     border-radius: 50%;
//     border: 5px solid lightblue;
//     border-right-color: orange;
//     animation: l2 1s infinite linear;

//     @keyframes l2 {
//         to {
//             transform: rotate(1turn);
//         }
//     }

//     ${(props) => props.customStyles}
// `

export default MainLoader
