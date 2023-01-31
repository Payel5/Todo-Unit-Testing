import {
  ActionIcon,
  Button,
  Card,
  ColorSchemeProvider,
  Container,
  Group,
  MantineProvider,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const taskTitle = useRef('');
  const taskSummary = useRef('');

  function createTask() {
    setTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
  }

  function deleteTask(index) {
    var clonedTasks = [...tasks];

    clonedTasks.splice(index, 1);

    setTasks(clonedTasks);

    saveTasks([...clonedTasks]);
  }

  function loadTasks() {
    let loadedTasks = localStorage.getItem('tasks');

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  function saveTasks(tasks) {
    console.log('tasks', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  console.log('tasks', tasks);

  return (
    <div data-testid="todo-1">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, defaultRadius: 'md' }}
          withGlobalStyles
          withNormalizeCSS
        >
          <div className="App">
            <Modal
              opened={opened}
              size={'md'}
              title={'New Task'}
              data-testid="modal"
              withCloseButton={false}
              onClose={() => {
                setOpened(false);
              }}
              centered
            >
              <TextInput
                mt={'md'}
                ref={taskTitle}
                placeholder={'Task Title'}
                required
                data-testid="titleinput"
                label={'Title'}
              />
              <TextInput
                ref={taskSummary}
                mt={'md'}
                data-testid="descinput"
                placeholder={'Task Summary'}
                label={'Summary'}
              />
              <Group mt={'md'} position={'apart'}>
                <Button
                  onClick={() => {
                    setOpened(false);
                  }}
                  variant={'subtle'}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    createTask();
                    setOpened(false);
                  }}
                >
                  Create Task
                </Button>
              </Group>
            </Modal>
            <Container size={550} my={40}>
              <Group position={'apart'}>
                <Title
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  My Tasks
                </Title>
                <ActionIcon
                  data-testid="themechangebtn"
                  color={'blue'}
                  onClick={() => toggleColorScheme()}
                  size="lg"
                >
                  {colorScheme === 'dark' ? (
                    <Sun size={16} />
                  ) : (
                    <MoonStars size={16} />
                  )}
                </ActionIcon>
              </Group>
              {tasks.length > 0 ? (
                tasks.map((task, index) => {
                  if (task.title) {
                    return (
                      <Card
                        withBorder
                        key={index}
                        mt={'sm'}
                        data-testid="taskcard"
                      >
                        <Group position={'apart'}>
                          <Text weight={'bold'}>{task.title}</Text>
                          <ActionIcon
                            onClick={() => {
                              deleteTask(index);
                            }}
                            color={'red'}
                            variant={'transparent'}
                          >
                            <Trash />
                          </ActionIcon>
                        </Group>
                        <Text color={'dimmed'} size={'md'} mt={'sm'}>
                          {task.summary
                            ? task.summary
                            : 'No summary was provided for this task'}
                        </Text>
                      </Card>
                    );
                  }
                })
              ) : (
                <Text size={'lg'} mt={'md'} color={'dimmed'}>
                  You have no tasks
                </Text>
              )}
              <Button
                data-testid="newTaskBtn"
                onClick={() => {
                  setOpened(true);
                }}
                fullWidth
                mt={'md'}
              >
                New Task
              </Button>
            </Container>
          </div>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
