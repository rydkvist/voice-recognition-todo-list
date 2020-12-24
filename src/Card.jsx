import React from "react";
import styled from "styled-components";
import { useTodoList } from "./TodoContext";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 1.25rem;
  width: 15rem;
  border-radius: 8px;
  background-color: #e3fdfd;
  margin: 1.25rem 0rem;
`;

const RemoveButton = styled.button``;

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

export const Card = ({ position, description }) => {
  const { onRemoveTask, onTaskDone } = useTodoList();

  return (
    <StyledCard>
      <Number>{position + 1}</Number>
      <Description>{description}</Description>
      <RemoveButton onClick={() => onRemoveTask(position)}>
        Remove ❌
      </RemoveButton>
      <RemoveButton onClick={() => onTaskDone(position)}>Done ✅</RemoveButton>
    </StyledCard>
  );
};

export const CompletedCard = ({ description }) => {
  return (
    <StyledCard>
      <Number>COMPLETED</Number>
      <Description>{description}</Description>
    </StyledCard>
  );
};
