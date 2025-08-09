import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/use-redux";
import { createTodo, deleteTodo, toggleTodo } from "./store/slices/todos";

const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const activeTodos = useAppSelector((state) => state.todos.activeTodos);
  const completedTodos = useAppSelector((state) => state.todos.completedTodos);

  const createFn = () => {
    if (!value.trim()) return;
    dispatch(createTodo({ id: Date.now(), text: value.trim(), completed: false }));
    setValue("");
  };

  const deleteFn = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const toggleFn = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Todo List</h1>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter task"
        style={{ width: "70%", marginRight: "10px" }}
      />
      <button onClick={createFn}>Create</button>

      <h2 style={{ marginTop: "30px" }}>📝 Active Todos</h2>
      <ul>
        {activeTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            {todo.text}
            <button style={{ marginLeft: "10px" }} onClick={() => toggleFn(todo.id)}>
              ✅ Done
            </button>
            <button style={{ marginLeft: "5px" }} onClick={() => deleteFn(todo.id)}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: "30px" }}>✅ Completed Todos</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span style={{ textDecoration: "line-through" }}>{todo.text}</span>
            <button style={{ marginLeft: "10px" }} onClick={() => toggleFn(todo.id)}>
              ↩️ Undo
            </button>
            <button style={{ marginLeft: "5px" }} onClick={() => deleteFn(todo.id)}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
