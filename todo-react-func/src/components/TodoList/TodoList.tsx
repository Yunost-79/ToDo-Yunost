import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { TodoState } from '../../globalVariables/typesVariables'
import { RootState } from '../../redux/store'
import TodoItem from './TodoItem/TodoItem'

const TodoList = () => {
    const todosState: TodoState = useSelector((state: RootState) => state.todos)

    const todosForRender = todosState.todos.sort((a, b) => {
        const dateA = new Date(a.dateOfCreation).getTime()
        const dateB = new Date(b.dateOfCreation).getTime()

        return dateB - dateA
    })
    // state = {
    //     emptyBlock: [
    //         {
    //             status: FILTER_STATUS.active,
    //             title: 'Active todos are empty',
    //             img: ghostImg,
    //         },
    //         {
    //             status: FILTER_STATUS.completed,
    //             title: 'Completed tasks are empty',T
    //             img: ghostImg,
    //         },
    //     ],
    // }

    // const { todoState, setTodoState, closeAllTodoEdit } = this.props
    // const { emptyBlock } = this.state

    // const emptyBlockElement = handleSetListElement(emptyBlock, todoState)

    // const todosForRender =
    //     todoState.filter !== FILTER_STATUS.all
    //         ? todoState.todos.filter((todo) => todo.status === todoState.filter)
    //         : todoState.todos

    // const sortedTodos = [...todosForRender].sort((a, b) => b.dateOfCreation - a.dateOfCreation)
    return (
        <StyledUl>
            {todosForRender
                ? todosForRender?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                : ''}

            {/* {sortedTodos && sortedTodos.length > 0
                    ? sortedTodos.map((todo) => (
                          <TodoItem
                              key={todo.id}
                              todo={todo}
                              todoState={todoState}
                              setTodoState={setTodoState}
                              closeAllTodoEdit={closeAllTodoEdit}
                          />
                      ))
                    : emptyBlockElement && <EmptyBlock emptyBlock={emptyBlockElement} />} */}
            {/* <TodoItem
            // key={todo.id}
            // todo={todo}
            // todoState={todoState}
            // setTodoState={setTodoState}
            // closeAllTodoEdit={closeAllTodoEdit}
            /> */}
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
