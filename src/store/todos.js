import { create } from "zustand";

const initialState = {
  todos: [{ id: crypto.randomUUID(), value: "할 일 1" }],
};

export const useTodoStore = create((set) => {
  return {
    ...initialState,
    action: {
      add: (newTodo) =>
        set((state) => ({
          todos: [...state.todos, { id: crypto.randomUUID(), value: newTodo }],
        })),
      remove: (id) =>
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
        })),
    },
  };
});
