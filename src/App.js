import React, { useEffect, Suspense } from 'react';
// import logo from './logo.svg'
import './App.scss';
import Loading from './components/Loading';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './redux/actions/todoAction';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

const TodoList = React.lazy(() => import('./components/TodoList'));

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <Header />
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </div>
  );
}

export default App;
