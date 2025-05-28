export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUNDS: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const

export type StatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES]
