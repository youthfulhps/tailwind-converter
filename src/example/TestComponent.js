import React from 'react';
import styled from 'styled-components';

const StyledComponentA = styled.div`
  display: flex;
  font-size: 8px;
`;

const StyledComponentB = styled.span`
  color: blue;
  border: 1px solid black;
`;

function Component() {
  return (
    <StyledComponentA className="test">
      <StyledComponentB>테스트</StyledComponentB>
    </StyledComponentA>
  );
}

export default Component;
