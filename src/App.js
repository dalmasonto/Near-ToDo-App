import { useEffect } from 'react';
import makeConnection from './app/nearFunctions';
import Navbar from './components/common/Navbar'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './pages';
import Todos from './pages/todos';
import Addtodo from './pages/addtodo';
import About from './pages/about';

import * as buffer from "buffer"

function App() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    window.Buffer = buffer.Buffer;
    setTimeout(() => {
      makeConnection(window);
    }, 2000);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/addtodo" element={<Addtodo />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
