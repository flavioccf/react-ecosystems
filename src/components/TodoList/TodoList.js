import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from '../TodoListItem/TodoListItem';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import { markTodoAsCompleted } from '../../actions';
import { deleteTodoRequest, loadTodos } from '../thunks';
import './TodoList.css';

const TodoList = ({todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos()
    },[]);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
    <div className="list-wrapper">
        <NewTodoForm></NewTodoForm>
        {todos.map((todo) => <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
    </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(deleteTodoRequest(id)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);