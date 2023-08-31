import React from 'react';
import styled from 'styled-components';

const StyledComponentA = styled.div`
  display: flex;
  font-size: 8px;
`;

const StyledComponentB = styled.span`
  color: blue;
`;

function Component() {
  const isTest = false;
  if (isTest) {
    return (
      <StyledComponentA className="test test">
        <StyledComponentB>테스트</StyledComponentB>
      </StyledComponentA>
    );
  }

  return isTest ? (
    <StyledComponentA className="test test">
      <StyledComponentB>테스트</StyledComponentB>
    </StyledComponentA>
  ) : (
    <StyledComponentA className="test test">
      <StyledComponentB>테스트</StyledComponentB>
    </StyledComponentA>
  );
}

export default Component;
