import { generateUserAvatar } from './avatarHelpers'

describe('generateUserAvatar', () => {
    it('should return URL with username and parameters', () => {
        const username = 'User Name'
        const url = generateUserAvatar(username)

        expect(url).toContain(`name=${username}`)
        expect(url).toContain('size=128')
    })
})
