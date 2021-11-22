import { ActionTypes } from '../constant/action-types';

const inititalState = {
    todos: [],
};
export const todoReducer = (state = inititalState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_TODOS:
            {
                return { ...state, todos: payload };
            }
        case ActionTypes.FETCH_TODOS:
            {
                return { ...state, todos: payload };
            }
        case ActionTypes.DELETE_SINGLE_TODO:
            {
                return {
                    ...state,
                    todos: [
                        ...state.todos.filter(todo => todo.id !== payload)
                    ]
                };
            }
        case ActionTypes.DELETE_MULTIPLE_TODO:
            {
                return {
                    ...state,
                    todos: filteredTodos(state.todos, payload)
                };
            }
        case ActionTypes.ADD_NEW_TODO:
            {
                return {
                    ...state,
                    todos: [payload, ...state.todos]
                };
            }


        default:
            return state;
    }
};

function filteredTodos(originalList, removeList) {

    var idArray = removeList.map((todo) => todo.id);


    let finalList = originalList.filter((item) => {
        return idArray.indexOf(item.id) === -1;
    });

    return finalList;
}
