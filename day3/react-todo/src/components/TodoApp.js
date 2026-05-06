import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // useEffect (runs once)
  useEffect(() => {
    console.log("App Loaded");
  }, []);

  // ADD TODO
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // DELETE TODO
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
  <div className="todo-container">
    <h2 style={{ textAlign: "center" }}>Todo App</h2>
    <TodoForm addTodo={addTodo} />
    <TodoList
      todos={todos}
      deleteTodo={deleteTodo}
      toggleComplete={toggleComplete}
    />
  </div>
);
}

export default TodoApp;