import styled from '@emotion/styled'
import { useEffect, useMemo, useRef } from 'react'
import dragula from 'react-dragula'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { handleSetListElement } from '../../helpers/helpers'
import { changeTodoCounter, getTodos, reorderTodos } from '../../redux/actions/todoActions'
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
    const todosRef = useRef<Todo[]>(todos)
    const containerRef = useRef<HTMLUListElement>(null)

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

        return todos.filter((todo: Todo) => todo.status === filter)
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

    useEffect(() => {
        todosRef.current = todos
    }, [todos])

    useEffect(() => {
        if (!containerRef.current) return

        const drake = dragula([containerRef.current], {
            moves: (el, source, handle) => {
                return (
                    handle?.classList.contains('drag-handle') ||
                    handle?.closest('.drag-handle') !== null
                )
            },
        })

        drake.on('drop', (el, target) => {
            if (!target) return

            const newTodosOrder = Array.from(target.children)
                .map((child) => {
                    const todoId = child.getAttribute('data-id')
                    return todosRef.current.find((todo) => todo.taskId === Number(todoId))
                })
                .filter(Boolean) as Todo[]

            dispatch(reorderTodos(newTodosOrder))
            dispatch(getTodos())
        })

        return () => {
            drake.destroy()
        }
    }, [dispatch, todosForRender.length])

    if (!todosForRender || todosForRender.length === 0) {
        return emptyListForRender ? <EmptyBlock title={emptyListForRender.title} /> : null
    }
    return (
        <StyledUl ref={containerRef}>
            {todosForRender?.map((todo) => (
                <DraggableItem key={todo.taskId} data-id={todo.taskId}>
                    <TodoItem todo={todo} />
                </DraggableItem>
            ))}
        </StyledUl>
    )
}

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 4px;
`

const DraggableItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: ${COLORS.WHITE};
    border-radius: 4px;
    box-shadow: 0 1px 3px ${COLORS.LIGHT_GREY};
    transition: all 0.2s ease;

    &.gu-transit {
        opacity: 0.5;
        background-color: ${COLORS.LIGHT_GREY};
    }

    &.gu-mirror {
        opacity: 0.2;
        transform: scale(1.02);
        box-shadow: 0 4px 8px ${COLORS.LIGHT_GREY};
        z-index: 10;
    }
`

export default TodoList
