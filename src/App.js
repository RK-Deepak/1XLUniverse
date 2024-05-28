import logo from './logo.svg';
import './App.css';
import Todo from './componets/Todo';
import { useEffect } from 'react';


function App() {

  return (
    <div className="App todo-container">
      <Todo />
    </div>
  );
}

export default App;
