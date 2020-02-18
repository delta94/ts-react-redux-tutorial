import { createAction, ActionType, createReducer } from "typesafe-actions";

// 액션 Type
const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";
const REMOVE_TODO = "todos/REMOVE_TODO";

// 액션 생성함수
export const addTodo = createAction(ADD_TODO)<string>();
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();

// Type 작성
const actions = { addTodo, toggleTodo, removeTodo };
type TodosAction = ActionType<typeof actions>;
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};
type TodosState = Todo[];

// 초기값 설정
const initialState: TodosState = [
  { id: 1, text: "밥먹기", done: true },
  { id: 2, text: "빨래하기", done: false },
  { id: 3, text: "노래하기", done: false }
];

// 리듀서 구현
const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, { payload: text }) =>
    state.concat({
      id: Math.max(0, ...state.map(todo => todo.id)) + 1,
      text,
      done: false
    }),
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) =>
    state.filter(todo => todo.id !== id)
});
export default todos;
