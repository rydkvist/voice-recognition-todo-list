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

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

export const Card = ({ position, description }) => {
  const { onRemoveItem } = useTodoList();

  return (
    <StyledCard>
      <Number>{position + 1}</Number>
      <Description>{description}</Description>
      <button onClick={() => onRemoveItem(position)}>Remove this item</button>
    </StyledCard>
  );
};
