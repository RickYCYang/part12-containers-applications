import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Todo from '../../Todos/Todo';

const completedTodo = {
  done: true,
  text: 'Learn about container Aris',
  __v: 0,
  _id: '6377b5a0dd5d29951032707e',
};

const notCompletedTodo = {
  done: false,
  text: 'Learn about container Aris',
  __v: 0,
  _id: '6377b5a0dd5d29951032707e',
};

describe('<Todo />', () => {
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();
  let container;

  afterEach(() => {
    cleanup();
  });

  test('Render completed Todo', () => {
    container = render(
      <Todo
        todo={completedTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container;
    const todoText = screen.getByText(`${completedTodo.text}`);
    expect(todoText).toBeInTheDocument();
    const statusText = screen.getByText('This todo is done');
    expect(statusText).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    const setDoneButton = screen.queryByText('Set as done');
    expect(setDoneButton).toBe(null);
    expect(container).toMatchSnapshot();
  });

  test('Render not completed Todo', () => {
    container = render(
      <Todo
        todo={notCompletedTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container;
    const todoText = screen.getByText(`${completedTodo.text}`);
    expect(todoText).toBeInTheDocument();
    const statusText = screen.getByText('This todo is not done');
    expect(statusText).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    const setDoneButton = screen.getByText('Set as done');
    expect(setDoneButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('Click delete button of not completed todo', () => {
    container = render(
      <Todo
        todo={notCompletedTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container;

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalled();
    expect(mockDeleteTodo).toHaveBeenCalledWith(notCompletedTodo);
  });

  test('Click set as done button of not completed todo', () => {
    container = render(
      <Todo
        todo={notCompletedTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container;

    const setDoneButton = screen.getByText('Set as done');
    userEvent.click(setDoneButton);
    expect(mockCompleteTodo).toHaveBeenCalled();
    expect(mockCompleteTodo).toHaveBeenCalledWith(notCompletedTodo);
  });
});
