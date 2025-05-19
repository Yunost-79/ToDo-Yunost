import styled from '@emotion/styled'
import { Component } from 'react'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { FilterStatus, TodoState } from '../../globalVariables/typesVariables'
import TodoItem from './TodoItem/TodoItem'

import { ReactComponent as ghostImg } from '../../assets/ghost.svg'
import { handleSetListElement } from '../../helpers/helpers'
import EmptyBlock from './EmptyBlock/EmptyBlock'

type TodoListProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
    closeAllTodoEdit: () => void
}

type Empty = {
    status: FilterStatus
    title: string
    img: React.FC<React.SVGProps<SVGSVGElement>>
}

type TodoListState = {
    emptyBlock: Empty[]
}

class TodoList extends Component<TodoListProps, TodoListState> {
    state = {
        emptyBlock: [
            {
                status: FILTER_STATUS.active,
                title: 'Active todos are empty',
                img: ghostImg,
            },
            {
                status: FILTER_STATUS.completed,
                title: 'Completed tasks are empty',
                img: ghostImg,
            },
        ],
    }

    render() {
        const { todoState, setTodoState, closeAllTodoEdit } = this.props
        const { emptyBlock } = this.state

        const emptyBlockElement = handleSetListElement(emptyBlock, todoState)

        const todosForRender =
            todoState.filter !== FILTER_STATUS.all
                ? todoState.todos.filter((todo) => todo.status === todoState.filter)
                : todoState.todos

        const sortedTodos = [...todosForRender].sort((a, b) => b.dateOfCreation - a.dateOfCreation)
        return (
            <StyledUl>
                {sortedTodos && sortedTodos.length > 0
                    ? sortedTodos.map((todo) => (
                          <TodoItem
                              key={todo.id}
                              todo={todo}
                              todoState={todoState}
                              setTodoState={setTodoState}
                              closeAllTodoEdit={closeAllTodoEdit}
                          />
                      ))
                    : emptyBlockElement && <EmptyBlock emptyBlock={emptyBlockElement} />}
            </StyledUl>
        )
    }
}

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 100%;
`

export default TodoList
