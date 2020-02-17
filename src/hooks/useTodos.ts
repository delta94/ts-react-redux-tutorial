import { useSelector } from "react-redux";
import { RootState } from "../modules";

export default () => {
  const todos = useSelector((state: RootState) => state.todos);
  return todos;
};
