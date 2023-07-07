import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation
} from '../api/apiSlice'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const TodoList = () => {
    const [todo, setTodo] = useState('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({ userId: 1, title: todo, completed: false })
        setTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit} className="flex border">
            <label className="outside" htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    name="new-todo"
                    id="new-todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Enter new todo"
                    className="p-half"
                />
            </div>
            <button className='submit'>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map(todo => {
            return (
                <article key={todo.id} className="flex border mt-half">
                    <div className="todo flex">
                        <input type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className='trash' onClick={() => deleteTodo({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error.status} </p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            <div className="contents">{content}</div>
        </main>
    )
}

export default TodoList