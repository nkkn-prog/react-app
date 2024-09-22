import { useState, useEffect } from 'react'
import './App.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}


// 2重でレンダリングされるのは、strictmodeが原因
// プロダクションビルドでは、この二重レンダリングは発生しない
function App() {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const [inputValue, setInputValue] = useState('');

    // デバッグ用
    useEffect(() => {
        console.log('toDoList updated:', toDoList);
    }, [toDoList]);

    const handleAddToDo = () => {
        if (inputValue.trim() !== '') {
            setToDoList((prevList) => [
                ...prevList,
                {
                    id: prevList.length + 1,
                    text: inputValue,
                    completed: false,
                },
            ]);
            setInputValue('');
        }
    }

    const handleToggleToDo = (id: number) => {
        setToDoList((prevList) =>
            prevList.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    const todoList = toDoList.map((todo) =>
        <div className="todo-item"　key={todo.id}>
            <div
            >
                <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => handleToggleToDo(todo.id)}
                />
                <label className="todo-text">{todo.text}</label>
            </div>
            <span
                className="delete-icon"
                onClick={() => setToDoList((prevList) => prevList.filter((t) => t.id !== todo.id))}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </span>
        </div>

    )

    return (
        <>
            <h1>Quick TODO App</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="新しいタスクを入力"
                    className="input-todo"
                />
                <button onClick={handleAddToDo} className="add-button">Add</button>
            </div>
            <div>
                <p>Your To Do</p>
                {todoList}
            </div>
        </>
    )
}

export default App