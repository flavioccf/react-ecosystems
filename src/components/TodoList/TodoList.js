import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from '../TodoListItem/TodoListItem';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import { deleteTodoRequest, loadTodos, completeTodoRequest } from '../thunks';
import './TodoList.css';

const TodoList = ({todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos()
    },[]);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
    <div className="list-wrapper">
        <NewTodoForm></NewTodoForm>
        {todos.map((todo) => <TodoListItem key={todo._id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
    </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: _id => dispatch(deleteTodoRequest(_id)),
    onCompletedPressed: _id => dispatch(completeTodoRequest(_id)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);