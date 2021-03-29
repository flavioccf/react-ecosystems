import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../selectors';
import { addTodoRequest } from '../thunks';
import './NewTodoForm.css';

const NewTodoForm = ({ todos, onCreatePressed }) => {

    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onCreatePressed(inputValue);
            setInputValue('');
        }
    }

    return (
        <div className="new-todo-form">
            <input 
            className="new-todo-input" 
            type="text"
            placeholder="Type Your New Todo Here"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={e => setInputValue(e.target.value)}
            ></input>
            <button 
            onClick={() => {
                const isDuplicateText = todos.some(todo => todo.text === inputValue);
                if (!isDuplicateText) {
                    onCreatePressed(inputValue);
                    setInputValue('');
                } else {
                    console.log('duplicate');
                }
            }}
            className="new-todo-button">Create Todo</button>
        </div>
    );
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);