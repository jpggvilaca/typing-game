import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: absolute;
  top: -9999px;
`

const Input = ({ onChange, innerRef }) => (
  <StyledInput type="text" innerRef={innerRef} onChange={onChange} />
);

export default Input;
