import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: red;
  color: white;
  outline: none;
  padding: 10px;
  font-size: 24px;
  text-transform: uppercase;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: black;
    border-color: red;
    cursor: pointer;
  }
`;

const Button = ({ onClick }) => (
  <StyledButton onClick={onClick}>Start!</StyledButton>
);

export default Button;