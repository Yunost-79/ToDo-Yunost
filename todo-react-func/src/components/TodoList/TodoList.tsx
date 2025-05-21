import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { FilterStatus, TodoState } from '../../globalVariables/typesVariables'
import { handleSetListElement } from '../../helpers/helpers'
import { RootState } from '../../redux/store'
import EmptyBlock from './EmptyBlock/EmptyBlock'
import TodoItem from './TodoItem/TodoItem'

type EmptyListItem = {
    status: FilterStatus
    title: string
}

const TodoList = () => {
    const todosState: TodoState = useSelector((state: RootState) => state.todos)

    const emptyList: EmptyListItem[] = [
        {
            status: FILTER_STATUS.active,
            title: 'Active todos are empty',
        },
        {
            status: FILTER_STATUS.completed,
            title: 'Completed tasks are empty',
        },
    ]

    const emptyListForRender = handleSetListElement(emptyList, todosState)

    const todosStateForRender =
        todosState.filter !== FILTER_STATUS.all
            ? todosState.todos.filter((todo) => todo.status === todosState.filter)
            : todosState.todos

    const todosForRender = todosStateForRender.sort((a, b) => {
        const dateA = new Date(a.dateOfCreation).getTime()
        const dateB = new Date(b.dateOfCreation).getTime()

        return dateB - dateA
    })

    return (
        <StyledUl>
            {todosForRender && todosForRender.length > 0
                ? todosForRender?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                : emptyListForRender && <EmptyBlock title={emptyListForRender?.title} />}
        </StyledUl>
    )
}

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 100%;
`

export default TodoList
