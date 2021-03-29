import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from '../TodoListItem/TodoListItem';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import { deleteTodoRequest, loadTodos, completeTodoRequest } from '../thunks';
import './TodoList.css';
import { getCompletedTodos, getIncompletedTodos, getTodos, getTodosLoading } from '../selectors';

const TodoList = ({completedTodos, incompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos()
    },[]);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
    <div className="list-wrapper">
        <NewTodoForm></NewTodoForm>
        <h3>Incomplete</h3>
        {incompletedTodos.map((todo) => <TodoListItem key={todo._id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
        <hr></hr>
        <h3>Completed</h3>
        {completedTodos.map((todo) => <TodoListItem key={todo._id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
    </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompletedTodos(state)
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: _id => dispatch(deleteTodoRequest(_id)),
    onCompletedPressed: _id => dispatch(completeTodoRequest(_id)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);