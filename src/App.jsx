// todo store
import { useTodoStore } from "./store/todos";

function App() {
  const todos = useTodoStore((state) => state.todos);
  const { add, remove } = useTodoStore((state) => state.action);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = e.target.newTodo.value;

    if (newTodo === "") return;
    add(newTodo);

    e.target.newTodo.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="할 일" name="newTodo" />
        <button>등록</button>
      </form>
      <ul>
        {todos.map((item) => {
          const { id, value } = item;
          return (
            <li key={`todo-${id}`}>
              {value} <button onClick={() => remove(id)}>삭제</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
