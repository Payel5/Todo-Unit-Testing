import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from '../todos';

test('should render todo component', () => {
  render(<Todos />);
  const todoElement = screen.getByTestId('todo-1');
  expect(todoElement).toHaveTextContent('New Task');
});

test.only('should New Task button works properly', async () => {
  render(<Todos />);
  const buttonElement = screen.getByTestId('newTaskBtn');
  await userEvent.click(buttonElement);
  expect(screen.getByTestId('modal')).toBeInTheDocument();
  expect(screen.getByTestId('titleinput')).toBeInTheDocument();
  await userEvent.type(screen.getByTestId('titleinput'), 'Hello,World!');
  expect(screen.getByTestId('titleinput')).toHaveValue('Hello,World!');
  expect(screen.getByTestId('descinput')).toBeInTheDocument();
  await userEvent.type(screen.getByTestId('descinput'), 'Todo Desc');
  expect(screen.getByTestId('descinput')).toHaveValue('Todo Desc');
  const tasktitleinput = 'Task Title';
  const taskdescinput = 'Task description';

  fireEvent.change(screen.getByTestId('titleinput'), {
    target: { value: tasktitleinput },
  });
  fireEvent.change(screen.getByTestId('descinput'), {
    target: { value: taskdescinput },
  });
  fireEvent.click(screen.getByText(/Create Task/i));
  expect(screen.getAllByTestId('taskcard').length).toBe(1);
});

test('title should be there in component', () => {
  render(<Todos />);
  const titleElement = screen.getByRole('heading');
  expect(titleElement).toBeInTheDocument();
});
test('background color action button should work properly', () => {
  render(<Todos />);
  const themechangeElement = screen.getByTestId('themechangebtn');
  userEvent.click(themechangeElement);
});
test('Create task button should work properly', () => {
  render(<Todos />);
  const createtaskbuttonElement = screen.getByRole('button', {
    name: 'New Task',
  });
  userEvent.click(createtaskbuttonElement);
});
