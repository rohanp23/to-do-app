import { ActionTypes } from '../constant/action-types';
import todoAPI from '../../apis/todoAPI';


export const fetchTodos = () => {
    return async function (dispatch) {
        const resposne = await todoAPI.get("/todos").catch((err) => { console.log("err", err); });
        dispatch({
            type: ActionTypes.FETCH_TODOS,
            payload: resposne.data
        });
    };


};
export const addnewTodo = (todo) => {
    return {
        type: ActionTypes.ADD_NEW_TODO,
        payload: todo
    };
};
export const setTodos = (todos) => {
    return {
        type: ActionTypes.SET_TODOS,
        payload: todos
    };
};

export const deleteSingleTodo = (todoId) => {
    return {
        type: ActionTypes.DELETE_SINGLE_TODO,
        payload: todoId
    };
};

export const deleteMultipleTodos = (todo) => {
    return {
        type: ActionTypes.DELETE_MULTIPLE_TODO,
        payload: todo
    };
};