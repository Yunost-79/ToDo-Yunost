import styled from '@emotion/styled'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { handleSetListElement } from '../../helpers/helpers'
import { changeTodoCounter, getTodos } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import EmptyBlock from './EmptyBlock/EmptyBlock'
import TodoItem from './TodoItem/TodoItem'

type EmptyListItem = {
    status: FilterStatus
    title: string
}

const TodoList = () => {
    const todoState = useSelector((state: RootState) => state.todos)
    const { todos, filter } = todoState

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

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

    const emptyListForRender = handleSetListElement(emptyList, todoState)

    const currentTodos: Todo[] = useMemo(() => {
        if (filter === FILTER_STATUS.all) return todos

        return todos.filter((todo) => todo.status === filter)
    }, [todos, filter])

    useEffect(() => {
        dispatch(changeTodoCounter(currentTodos.length))
    }, [currentTodos, dispatch])

    const todosForRender = useMemo(() => {
        return currentTodos?.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()

            return dateB - dateA
        })
    }, [currentTodos])

    return (
        <StyledUl>
            {todosForRender && todosForRender.length > 0
                ? todosForRender?.map((todo) => <TodoItem key={todo.taskId} todo={todo} />)
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
