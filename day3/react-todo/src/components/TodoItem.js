import React from "react";
import "./Todo.css";

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      <span className="todo-text">
        {todo.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        ✕
      </button>
    </div>
  );
}

export default TodoItem;