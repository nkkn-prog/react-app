import {useEffect, useState} from 'react'
import './App.css'

interface ToDo {
    id: number;
    text: string;
}

function App() {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        console.log('toDoList updated:', toDoList);
    }, [toDoList]);

    const addToDo = () => {

        /*処理の前後でtoDoListの中身を確認すると、
        * newListBeforeAddとnewListAfterAddの両方で空の配列が返される。
        * React の useState フックを使用して状態を更新する際（この場合は setToDoList）、その更新は即時には反映されない。
        * React は性能最適化のために、複数の状態更新をバッチ処理し、一度にまとめてレンダリングを行う。
        */
        // console.log('newListBeforeAdd', toDoList)

        if (inputValue.trim() !== '') {
            setToDoList((prevList) => [
                // 既存のtoDoListの全要素を新しい配列にコピーし、その後に新しいオブジェクトを追加している。
                ...prevList,
                {
                    id: prevList.length + 1,
                    text: inputValue,
                },
            ]);
            setInputValue('');
        }
        // console.log('newListAfterAdd', toDoList)
    }

    return (
        <>
            <h1>Quick TODO App</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="新しいタスクを入力"
                />
                <button onClick={addToDo}>Add</button>
            </div>
            <ul>
                {toDoList.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </>
    )
}

export default App
