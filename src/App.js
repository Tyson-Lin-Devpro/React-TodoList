import React, { useState, useEffect } from 'react';
import "./style.css";
import Form from './components/Form'
import TodoList from './components/TodoList.js'


function App() {
  //useState涵式，使用hook,宣告[a,b]常數，a為變量名稱，b為重設涵式，後useState(a的預設值)，更改a的值使用b(XXX)修改
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  //useEffect涵式，定義那些hook更新後要執行一次的函數
  useEffect(() => {
    getLocalTodos();//頁面render後執行取的localstorage的資料並載入的涵式
  },[])//空的表示只會在第一次render時執行而已

  useEffect(() => {
    filterHandler();//todos和status[每次]render執行項目分類一次
    saveLocalTodos();//todos和status[每次]render都會儲存資料在本地端
  }, [todos, status]);//todos和status[每次]render時執行一次
  
  
  //切換選項後顯示的內容
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //將物件轉譯成JSON檔並以"todos"作為key值儲存在本地記憶體
  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify(todos));
  }
  //取得本地記憶體key值為"todos"的JSON檔轉譯為物件並載入並片歷
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>待辦事項清單</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default App;
