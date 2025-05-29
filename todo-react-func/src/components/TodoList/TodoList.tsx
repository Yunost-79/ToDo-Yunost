import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterStatus, TodoState } from '../../globalVariables/typesVariables'
import { getTodos } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import TodoItem from './TodoItem/TodoItem'

type EmptyListItem = {
    status: FilterStatus
    title: string
}

const TodoList = () => {
    const todoState: TodoState = useSelector((state: RootState) => state.todos)
    const { todos, filteredTodos, filter }: TodoState = useSelector(
        (state: RootState) => state.todos,
    )

    const dispatch = useDispatch()
    console.log('todoState in TodoList', todoState)

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    // const emptyList: EmptyListItem[] = [
    //     {
    //         status: FILTER_STATUS.active,
    //         title: 'Active todos are empty',
    //     },
    //     {
    //         status: FILTER_STATUS.completed,
    //         title: 'Completed tasks are empty',
    //     },
    // ]

    // const emptyListForRender = handleSetListElement(emptyList, todosState)

    // const todosStateForRender = filter !== FILTER_STATUS.all && dispatch(getFilteredTodos(filter))

    // const todosStateForRender = todos
    const todosForRender = todos?.sort((a, b) => {
        const dateA = new Date(a.dateOfCreation).getTime()
        const dateB = new Date(b.dateOfCreation).getTime()

        return dateB - dateA
    })

    return (
        <StyledUl>
            {todosForRender?.map((todo) => <TodoItem key={todo.taskId} todo={todo} />)}

            {/* {todosForRender && todosForRender.length > 0
                ? todosForRender?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                : emptyListForRender && <EmptyBlock title={emptyListForRender?.title} />} */}
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
