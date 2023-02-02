import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from '../todos';
import { fetchTasks } from '../todoUtils';

test('should render todo component', () => {
  render(<Todos />);
  const todoElement = screen.getByTestId('todo-1');
  expect(todoElement).toHaveTextContent('New Task');
});

test('Check todo list empty', () => {
  render(<Todos />);
  const todoListElement = screen.getByText('You have no tasks');
  expect(todoListElement).toBeInTheDocument();
});

test('should New Task button works properly', async () => {
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
  //After creating task check task is there
  fireEvent.click(screen.getByText(/Create Task/i));
  expect(screen.getAllByTestId('taskcard').length).toBe(1);
  //Check todo list not empty
  expect(screen.getAllByTestId('alltasklist').length).toBeGreaterThan(0);
  //After deleting task check task is not there
  const deletebtnelement = screen.getByTestId('deletebtn');
  await fireEvent.click(deletebtnelement);
  const todoListElement = screen.getByText('You have no tasks');
  expect(todoListElement).toBeInTheDocument();
});

test('title should be there in component', () => {
  render(<Todos />);
  const titleElement = screen.getByRole('heading');
  expect(titleElement).toBeInTheDocument();
});
test('background color action button should work properly', () => {
  render(<Todos />);
  const themeColorValue = localStorage.getItem('mantine-color-scheme');
  const themechangeElement = screen.getByTestId('themechangebtn');
  userEvent.click(themechangeElement);
  expect(localStorage.getItem('mantine-color-scheme')).toBe(
    themeColorValue === '"dark"' ? '"light"' : '"dark"'
  );
});

/* Checking how getByRole works , this testing already done at the top */
// test('Create task button should work properly', () => {
//   render(<Todos />);
//   const createtaskbuttonElement = screen.getByRole('button', {
//     name: 'New Task',
//   });
//   userEvent.click(createtaskbuttonElement);
// });

test('Promise data coming correctly', () => {
  return fetchTasks.then((data) => {
    expect(data).toBe('Code is Working');
  });
});
