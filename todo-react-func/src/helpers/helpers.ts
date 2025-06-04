import { FilterStatus } from '../globalVariables/typesVariables'

export const handleSetListElement = <T extends { status: string }>(
    renderList: T[],
    filter: FilterStatus,
): T | undefined => {
    return renderList.find((list) => list.status === filter)
}
