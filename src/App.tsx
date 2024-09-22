import { useState, useEffect } from 'react'
import './App.css'

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

interface ItemProps {
    id: number;
    text: string;
    completed: boolean;
}


// 2重でレンダリングされるのは、strictmodeが原因
// プロダクションビルドでは、この二重レンダリングは発生しない
function App() {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const [inputValue, setInputValue] = useState('');

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

    const Item = ({ id, text, completed}: ItemProps): JSX.Element => {
        return (
            <div
                key={id}
                className="todo-item"
            >
                <input
                    type="checkbox"
                    id={`todo-${id}`}
                    checked={completed}
                    onChange={() => handleToggleToDo(id)}
                />
                <label>{text}</label>
            </div>
        )
    }

    const todoList = toDoList.map((todo) =>
        <Item
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
        />
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