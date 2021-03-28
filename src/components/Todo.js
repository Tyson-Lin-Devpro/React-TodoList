import React from 'react';

const Todo = ({ text, todo, todos, setTodos }) => {//從父元素傳過來的值

  //過濾除了自身相同ID的項目後回傳setTodos
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  }
//已完成切換按鈕
  const completeHandler = () => {
    setTodos(todos.map((item) => {//這裡的item是todos裡的東西，自行命名
      if (item.id === todo.id) {
        return {
          ...item,//複製一份就項目
          completed: !item.completed//將複製的內容修改為!相反，completed值只有true或false
        }
      }
      return item;//回傳修改完的內容
    }))
  }
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;