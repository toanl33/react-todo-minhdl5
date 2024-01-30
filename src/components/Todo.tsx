import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { TodoActionType, useTodosDispatch } from "../context/todo";
import { TTodo } from "../models";
import { Checkbox, Button, Input } from "./ui";

const Todo = (props: TTodo) => {
  const dispatch = useTodosDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState(props.content);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnableEditing = () => {
    setIsEditing(true);
    const timerId = setTimeout(() => {
      inputRef.current?.focus();
      clearTimeout(timerId);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: TodoActionType.UPDATE,
      payload: { ...props, content: newTodoContent },
    });

    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    dispatch({
      type: TodoActionType.UPDATE,
      payload: { ...props, completed: !props.completed },
    });
  };

  const handleDelete = () => {
    dispatch({ type: TodoActionType.DELETE, payload: props.id });
  };

  return (
    <Container
      layoutId={props.id}
      initial={{ translateY: 12, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: -12, opacity: 0 }}
    >
      {!isEditing && (
        <StyledCheckbox
          checked={props.completed}
          onChange={handleToggleComplete}
        />
      )}

      {!isEditing && (
        <Content
          completed={props.completed}
          onDoubleClick={handleEnableEditing}
        >
          {props.content}
        </Content>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            type="text"
            defaultValue={props.content}
            onChange={(e) => setNewTodoContent(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
        </Form>
      )}

      {!isEditing && (
        <DeleteButton onClick={handleDelete}>
          <X />
        </DeleteButton>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  padding-left: 32px;
`;

const StyledCheckbox = styled(Checkbox)`
  flex-shrink: 0;
`;

type ContentProps = {
  completed: boolean;
};
const Content = styled.span<ContentProps>`
  margin: 0 12px;
  color: ${(props) =>
    props.completed ? "hsl(var(--muted-foreground))" : "inherit"};
`;

const DeleteButton = styled(Button)`
  height: 26px;
  width: 26px;
`;

export { Todo };
