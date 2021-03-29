import { 
    loadTodosFailure, 
    loadTodosInProgress, 
    loadTodosSuccess,
    createTodo,
    removeTodo, 
    markTodoAsCompleted
} from '../actions';

const url = process.env.REACT_APP_SERVER_URL;

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch(`${url}/todos-delay`);
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch(e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async (dispatch, getState) => {
    const body = JSON.stringify({ text });
    try {
        const response = await fetch(`${url}/todos`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch(e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};

export const deleteTodoRequest = _id => async (dispatch, getState) => {
    try {
        const response = await fetch(`${url}/todos/${_id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'delete'
        });
        const removedTodo = await response.json();
        console.log(removedTodo);
        dispatch(removeTodo(removedTodo));
    } catch(e) {
        dispatch(displayAlert(e));
    }
}

export const completeTodoRequest = _id => async (dispatch, getState) => {
    try {
        const response = await fetch(`${url}/todos/${_id}/completed`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'put'
        });
        const updatedTodo = await response.json();
        console.log(updatedTodo);
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch(e) {
        dispatch(displayAlert(e));
    }
}