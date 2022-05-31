import { useState, useEffect, useRef } from "react";
import Card from "./components/Card.js";
import "./css/styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentDisplay, setCD] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=" + limit)
      .then((response) => response.json())
      .then((json) => (console.log(json), setTodos(json)));
  }, [limit]);

  // const listInnerRef = useRef();

  // const scrollCheck = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setLimit(limit + 10);
  //     }
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">To-Do App</header>
      <div className="cards" onScroll={scrollCheck} /*ref={listInnerRef}*/>
        {todos.map((item) => (
          <Card data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
