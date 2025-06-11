import { CircularProgress, styled } from '@mui/material'
import autoScroll from 'dom-autoscroller'
import dragula from 'dragula'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { handleSetListElement } from '../../helpers/helpers'
import { closeAllTodosIsEdit, getTodosRequest, reorderTodos } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import EmptyBlock from './EmptyBlock/EmptyBlock'
import TodoItem from './TodoItem/TodoItem'

type EmptyListItem = {
    status: FilterStatus
    title: string
}

const TodoList = () => {
    const dispatch = useDispatch()
    const { todos, filter, isEnd, isLoading } = useSelector((state: RootState) => state.todos)

    const todosRef = useRef<Todo[]>(todos)
    const containerRef = useRef<HTMLUListElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && !isEnd) {
                    dispatch(getTodosRequest())
                }
            },
            { threshold: 0.6 },
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    }, [filter, isLoading, isEnd, dispatch])

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

        const scroll = autoScroll([containerRef.current], {
            margin: 50,
            maxSpeed: 20,
            scrollWhenOutside: false,
            autoScroll: () => drake.dragging,
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
            dispatch(closeAllTodosIsEdit())
        })

        return () => {
            drake.destroy()
            scroll.destroy()
        }
    }, [dispatch, todos.length, filter])

    const emptyList: EmptyListItem[] = [
        {
            status: FILTER_STATUS.all,
            title: 'Your todo list is empty',
        },
        {
            status: FILTER_STATUS.active,
            title: 'Active todos are empty',
        },
        {
            status: FILTER_STATUS.completed,
            title: 'Completed tasks are empty',
        },
    ]

    const emptyListForRender = handleSetListElement(emptyList, filter)

    if (todos.length === 0 && isEnd && !isLoading) {
        return emptyListForRender ? <EmptyBlock title={emptyListForRender.title} /> : null
    }
    return (
        <StyledUl ref={containerRef}>
            {todos?.map((todo: Todo) => (
                <DraggableItem
                    key={todo.taskId}
                    data-id={todo.taskId}
                    className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
                >
                    <TodoItem todo={todo} />
                </DraggableItem>
            ))}

            {!isEnd && (
                <StyledLazyLoader ref={loaderRef} style={{ margin: '15px 0' }}>
                    <CircularProgress color="inherit" size={30} />
                </StyledLazyLoader>
            )}
        </StyledUl>
    )
}

const StyledUl = styled('ul')({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    paddingLeft: 0,
    overflow: 'auto',
    maxHeight: '70vh',
})

const DraggableItem = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignCenter: 'center',
    gap: '8px',
    background: theme.palette.background.default,
    borderRadius: '4px',
    boxShadow: `0 2px 2px ${theme.palette.shadow.primary}`,
    transition: 'all 0.2s ease',

    '&.gu-transit': {
        opacity: 0.5,
        backgroundColor: theme.palette.primary.main,
    },
    '&.gu-mirror': {
        opacity: 0.2,
        transform: 'scale(1.02)',
        zIndex: 10,
    },
}))

const StyledLazyLoader = styled('div')({
    heigh: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export default TodoList
