import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TodoItemType, useTodoList } from "../context/TodoContext";
import { colors } from "../utils/colors";

const StyledCard = styled.div<{ bg?: string; borderColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 15rem;
  padding: 0.625rem 1.25rem;
  margin: 1.25rem 0rem;
  border-radius: 8px;
  background-color: ${(props) => (props.bg ? props.bg : taskColors[0].bg)};
  border: 2px solid
    ${(props) =>
      props.borderColor ? props.borderColor : taskColors[0].borderColor};
`;

const Palette = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > button {
    margin-left: 0.3125rem;
  }
`;

const Color = styled.button<{ bg: string; borderColor: string }>`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${(props) => (props.bg ? props.bg : colors.white)};
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : colors.yellow)};
  border-radius: 50%;
`;

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

export const taskColors = [
  { bg: colors.lightCyan, borderColor: colors.cyan },
  { bg: colors.pink, borderColor: colors.darkPink },
  { bg: colors.pistachio, borderColor: colors.olive },
  { bg: colors.lightYellow, borderColor: colors.yellow },
];

type TaskProps = {
  position: number;
  description: string;
  bg: string;
  borderColor: string;
};

export const Task = ({ position, description, bg, borderColor }: TaskProps) => {
  const {
    todoList,
    onRemoveTask,
    onTaskDone,
    onChangeTaskColor,
    onEditDescription,
  } = useTodoList();

  // const [descriptionInput, setDescriptionInput] = useState(description);

  // const onChangeDescription = (e: any) => {
  //   setDescriptionInput(e.target.value);
  //   onEditDescription(position, descriptionInput);
  // };

  // useEffect(() => {
  //   const thisTask = todoList.find(
  //     (item: TodoItemType) => item.id === position
  //   ) || { value: "" };

  //   setDescriptionInput(thisTask.value);
  // }, [todoList, position]);

  return (
    <StyledCard bg={bg} borderColor={borderColor}>
      <Palette>
        {taskColors.map((color, index) => (
          <Color
            key={index}
            onClick={() =>
              onChangeTaskColor(position, color.bg, color.borderColor)
            }
            bg={color.bg}
            borderColor={color.borderColor}
          />
        ))}
      </Palette>
      <Number>{position + 1}</Number>
      <Description>{description}</Description>
      <button onClick={() => onRemoveTask(position)}>Remove ❌</button>
      <button onClick={() => onTaskDone(position)}>Finish ✅</button>
    </StyledCard>
  );
};

export const CompletedTask = ({ description }: any) => {
  return (
    <StyledCard>
      <Number>COMPLETED</Number>
      <Description>{description}</Description>
    </StyledCard>
  );
};
