export const handleSetListElement = <T extends { status: string }, S extends { filter: string }>(
    renderList: T[],
    state: S,
) => {
    return renderList.find((list) => list.status === state.filter)
}
