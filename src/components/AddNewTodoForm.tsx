import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { TodoActionType, useTodosDispatch } from "../context/todo";
import { Input } from "./ui";

const AddNewTodoForm = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useTodosDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: TodoActionType.ADD, payload: newTodoText });
    setNewTodoText("");
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        onChange={(e) => {
          setNewTodoText(e.target.value);
        }}
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-grow: 1;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

export { AddNewTodoForm };
