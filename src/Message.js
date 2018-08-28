import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.div`
  align-items: center;
  border: 1px solid #333;
  display: flex;
  width: 500px;
  font-size: 24px;
  justify-content: center;
  padding: 30px;
`

const Message = ({ word }) => (
  <StyledMessage>
    <p>{word}</p>
  </StyledMessage>
);

export default Message;