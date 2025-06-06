const generateHexColor = (): string => {
    return Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
}

export const generateUserAvatar = (username: string) => {
    const avatarColor = generateHexColor()
    const avatarSize = 128
    return `https://ui-avatars.com/api/?name=${username}&background=${avatarColor}&size=${avatarSize}`
}
