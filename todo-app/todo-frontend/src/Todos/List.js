import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index) => {
        return (
          <div key={todo._id}>
            <hr />
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
