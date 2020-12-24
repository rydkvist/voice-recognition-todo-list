import React from "react";
import styled from "styled-components";
import { useTodoList } from "../context/TodoContext";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 1.25rem;
  width: 15rem;
  border-radius: 8px;
  background-color: #dafdfd;
  margin: 1.25rem 0rem;
`;

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

export const Task = ({ position, description }) => {
  const { onRemoveTask, onTaskDone } = useTodoList();

  return (
    <StyledCard>
      <Number>{position + 1}</Number>
      <Description>{description}</Description>
      <button onClick={() => onRemoveTask(position)}>Remove ❌</button>
      <button onClick={() => onTaskDone(position)}>Finish ✅</button>
    </StyledCard>
  );
};

export const CompletedTask = ({ description }) => {
  return (
    <StyledCard>
      <Number>COMPLETED</Number>
      <Description>{description}</Description>
    </StyledCard>
  );
};
