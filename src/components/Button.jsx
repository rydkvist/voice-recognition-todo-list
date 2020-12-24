import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: grid;
  place-items: center;

  width: ${(props) => (props.size ? props.size : "3.125rem")};
  height: ${(props) => (props.size ? props.size : "3.125rem")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.875rem")};

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#71c9ce"};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "#a6e3e9"};

  color: ${(props) => (props.color ? props.color : "#FFF")};

  border: 2px solid #a6e3e9;
  border-radius: 50%;

  box-shadow: 0px;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.borderColor ? props.borderColor : "#a6e3e9"};
  }
  &:focus {
    box-shadow: 0px 0px 5px 2px rgba(163, 221, 203, 0.75);
  }
`;

export const Button = ({
  size,
  fontSize,
  title,
  backgroundColor,
  borderColor,
  color,
  children,
  onClick,
}) => {
  return (
    <StyledButton
      size={size}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
      title={title}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
