import { 
    loadTodosFailure, 
    loadTodosInProgress, 
    loadTodosSuccess,
    createTodo 
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