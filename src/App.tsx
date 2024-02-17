import {
  Button,
  Checkbox,
  Flex,
  Group,
  Input,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  $tasks,
  addNewTodo,
  confirmEdit,
  deleteTodo,
  toggleDone,
  toggleEdit,
} from "./store/store";
import { useRef } from "react";
import { useUnit } from "effector-react";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  title: string;
  done: boolean;
  id: string;
  isEditing: boolean;
};
function App() {
  // const todos: Todo[] = [{ title: "Kto", done: false, id: 0 }];
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const todos = useUnit($tasks);

  return (
    <Stack maw={1200} ml="auto" mr="auto" align="center">
      <Title order={2}>Todoshka</Title>
      <Text>simple unstiled todo list on effector and mantine ui-kit</Text>
      <Flex gap={10}>
        <Input
          placeholder="What needs to be done"
          maw="fit-content"
          ref={inputRef}
        />
        <Button
          style={{ alignSelf: "flex-end" }}
          onClick={() => {
            if (inputRef.current && inputRef.current.value.trim() !== "") {
              addNewTodo({
                title: inputRef.current.value,
                done: false,
                id: uuidv4(),
                isEditing: false,
              });
              inputRef.current.value = "";
            }
          }}
        >
          Add
        </Button>
      </Flex>
      <Stack>
        {todos.map((todo: Todo) => (
          <Group gap={0}>
            <Checkbox onClick={() => toggleDone(todo)} />
            <Group p={10}>
              {!todo.isEditing && (
                <>
                  <Title
                    order={4}
                    w={100}
                    style={{
                      textDecorationLine: todo.done ? "line-through" : "",
                    }}
                  >
                    {todo.title}
                  </Title>
                  <Button onClick={() => toggleEdit(todo)}>Edit</Button>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => deleteTodo(todo)}
                  >
                    Delete
                  </Button>
                </>
              )}
              {todo.isEditing && (
                <>
                  <Input
                    defaultValue={todo.title}
                    type="text"
                    ref={editInputRef}
                  />
                  <Button
                    color="green"
                    onClick={() => {
                      if (
                        editInputRef.current &&
                        editInputRef.current.value !== todo.title &&
                        editInputRef.current.value.trim() !== ""
                      )
                        confirmEdit({
                          todo,
                          newTitle: editInputRef.current.value,
                        });
                    }}
                  >
                    Apply
                  </Button>
                  <Button color="red" onClick={() => toggleEdit(todo)}>
                    Cancel
                  </Button>
                </>
              )}
            </Group>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
}

export default App;
