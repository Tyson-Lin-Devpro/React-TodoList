import React from 'react';

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {//從父元素傳過來的值

  //更改inputText為輸入框的內容
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  //送出表單
  const submitTodoHandler = (e) => {
    e.preventDefault();//不會重新載入頁面
    if
      (
      inputText === "" ||
      inputText === null ||
      inputText.trim() === "" ||
      inputText.length > 50
    ) {
      setInputText("");
      return false;
    }
    else {
      setTodos([
        ...todos, //先複製一份目前todos的內容，加入新的內容後再傳回
        {
          text: inputText,
          completed: false,
          id: Math.random() * 1000
        }
      ]);
      setInputText("");
    }
  }
  //下拉式選單變更分類顯示
  const statusHandler = (e) => {
    setStatus(e.target.value)//這邊的e.target.value等於option裡的value
  }
  return (
    <form>
      <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="uncompleted">未完成</option>
        </select>
      </div>
    </form>
  )
};

export default Form;