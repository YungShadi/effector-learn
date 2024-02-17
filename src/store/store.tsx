import { createEvent, createStore } from "effector";
import { Todo } from "../App";

export const addNewTodo = createEvent<Todo>();
export const deleteTodo = createEvent<Todo>();
export const toggleDone = createEvent<Todo>();
export const toggleEdit = createEvent<Todo>();
export const confirmEdit = createEvent<{ todo: Todo; newTitle: string }>();

export const $tasks = createStore<Todo[]>([])
  .on(addNewTodo, (state, payload) => [...state, payload])
  .on(deleteTodo, (state, payload) =>
    state.filter((todo) => todo.id !== payload.id),
  )
  .on(toggleDone, (state, payload) => {
    const index = state.findIndex((todo) => todo.id === payload.id);
    state[index].done = !payload.done;
    return [...state];
  })
  .on(toggleEdit, (state, payload) => {
    state[state.findIndex((todo) => todo.id === payload.id)].isEditing =
      !payload.isEditing;
    return [...state];
  })
  .on(confirmEdit, (state, payload) => {
    state[state.findIndex((todo) => todo.id === payload.todo.id)].title =
      payload.newTitle;
    state[state.findIndex((todo) => todo.id === payload.todo.id)].isEditing =
      !payload.todo.isEditing;
    return [...state];
  });
