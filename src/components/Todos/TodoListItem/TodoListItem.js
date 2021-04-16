import React from 'react';
import './TodoListItem.css';
import styled from 'styled-components';

const TodoListItemContainer = styled.div`
    border: 1px solid;
    border-radius: 1rem;
`;

const TodoLisItemWarningContainer = styled(TodoListItemContainer)`
    border-color: ${props => (new Date(props.createdAt) > new Date(Date.now() - (60 * 60 * 24 * 5)))};
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
    const Container = todo.isCompleted ? TodoListItemContainer : TodoLisItemWarningContainer
    return (
        <Container>
            <h3>{todo.text}</h3>
            <div className="buttons-container">
            { todo.isCompleted ? null : <button 
            onClick={() => onCompletedPressed(todo._id)}
            className="completed-button">Mark As Completed</button>}
            <button 
            onClick={() => onRemovePressed(todo._id)}
            className="remove-button">Remove</button>
            </div>
        </Container>
    );
};

export default TodoListItem;