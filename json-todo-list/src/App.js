import { useState, useEffect, useRef } from "react";
import Card from "./components/Card.js";
import "./css/styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [apiHasMore, setAHM] = useState(true);
  const [todoTitle, setTodoTitle] = useState("");
  const [searchTerm, setST] = useState("");
  const test = "hi";

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    searchTodos();
  }, [searchTerm]);

  const loadTodos = () => {
    if (!apiHasMore) return;

    fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${todos.length}&_limit=10`
    )
      .then((response) => response.json())
      .then((json) => {
        setTodos([...todos, ...json]);
        if (json.length < 10) {
          setAHM(false);
        }
      });
  };

  const createTodo = () => {
    test = "bye";
    if (!todoTitle) return;
    fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      body: JSON.stringify({
        completed: false,
        title: todoTitle,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((createdTodo) => setTodos([createdTodo, ...todos]));
  };

  const editTodo = ({ completed, id, title, userId }) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((editedTodo) => {
        const editedTodos = todos.map((todo) => {
          if (todo.id === editedTodo.id) {
            return editedTodo;
          }

          return todo;
        });

        setTodos(editedTodos);
      });
  };

  const removeTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id != id)));
  };

  const searchTodos = () => {
    const filtered = todos.filter((todo) => todo.title.includes(searchTerm));
    setFilteredTodos(filtered);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadTodos();
    }
  };

  return (
    <div className="App">
      <header className="App-header">To-Do App</header>
      <h1>{test}</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setST(e.target.value)}
          value={searchTerm}
        ></input>
      </div>
      <div className="create-todo">
        Add new todo:
        <input
          type="text"
          placeholder="Add title"
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
        ></input>
        <button onClick={createTodo}>+</button>
      </div>
      <div className="card-container" onScroll={handleScroll}>
        {(searchTerm ? filteredTodos : todos).map((item) => (
          <Card
            key={item.id}
            data={item}
            editTodo={editTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
