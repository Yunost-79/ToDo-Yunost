export const FILTER_STATUS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const

export type FilterStatus = (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]
