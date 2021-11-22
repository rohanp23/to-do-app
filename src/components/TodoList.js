import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BsFillTrashFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleTodo, deleteMultipleTodos, setTodos, addnewTodo } from '../redux/actions/todoAction';
import { toast } from 'react-toastify';
const _ = require("lodash");

const TodoList = () => {

  const todoList = useSelector((state) => state.allTodos.todos);
  const dispatch = useDispatch();


  const [todoData, setTodoData] = useState(todoList);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {

    setTodoData(todoList);
  }, [todoList]);

  const deleteItem = (id) => {

    dispatch(deleteSingleTodo(id));
    toast.success("Successfully Deleted");
  };

  const handleChange = (event) => {

    const { name, checked } = event.target;

    if (name === 'all-select') {
      let tempTodoList = todoData.map((todo) => {
        return { ...todo, completed: checked };
      });
      setTodoData(tempTodoList);
      dispatch(setTodos(tempTodoList));
    }
    else {
      let tempTodoList = todoData.map((todo) =>
        todo.id === parseInt(name) ? { ...todo, completed: checked } : todo);
      setTodoData(tempTodoList);
      dispatch(setTodos(tempTodoList));


    }
  };
  const deleteSelected = (e) => {
    e.preventDefault();
    var reduced = todoData.reduce(function (filtered, todo) {
      if (todo.completed) {
        filtered.push(todo);
      }
      return filtered;
    }, []);
    if (reduced.length === 0) toast.error("Please select atleast one item.");
    dispatch(deleteMultipleTodos(reduced));
    toast.success("Successfully Deleted");
  };

  const addItem = (e) => {
    e.preventDefault();

    const newTodoItem = {
      userId: 1,
      id: _.random(1000, 5000),
      title: newTodo,
      completed: false
    };
    console.log("object", newTodoItem);
    dispatch(addnewTodo(newTodoItem));
    toast.success("Successfully Added");
    setNewTodo("");
  };
  const Validate = () => {
    return newTodo.length > 0;
  };
  return (
    <>
      <div className="todolist__buttons">
        <Button onClick={deleteSelected} variant="danger" style={{ 'fontSize': '13px' }}>Delete Selected</Button>

        <div className="todo__add">
          <input type="text" name="add_todo" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
          <Button
            onClick={(e) => addItem(e)}
            variant="success"
            style={{ 'fontSize': '13px', 'marginLeft': '2px' }}
            disabled={!Validate()}
          >
            Add
            </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={todoData.filter((todo) => todo.completed !== true).length < 1}
                className="form-check-input"
                name="all-select"
                onChange={handleChange}
              />

            </th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoData.length > 0 ? todoData.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={handleChange}
                  name={todo.id}
                  className="form-check-input"
                />
              </td>
              <td>{todo.title}</td>
              <td className="todolist__delete">
                {
                  <BsFillTrashFill
                    color="red"
                    size={16}
                    onClick={() => deleteItem(todo.id)}
                  />
                }
              </td>
            </tr>
          )) :
            <>
              <tr><td colSpan={3}>
                No data found
                </td></tr>
            </>}
        </tbody>
      </Table>
    </>
  );
};

export default TodoList;
