import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const TodoList = () => {
    const [todo, setTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        setTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit} className="flex">
            <label htmlFor="new-todo">Enter a new todo item</label>
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

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
        </main>
    )
}

export default TodoList