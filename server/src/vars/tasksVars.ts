export const FILTER_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const

export type FilterStatus = (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]
