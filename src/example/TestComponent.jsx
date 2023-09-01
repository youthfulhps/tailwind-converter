import React from 'react';
import styled from 'styled-components';

const StyledComponentA = styled.button`
  display: block;
  width: 100%;
  border-radius: 16px;
  padding: 15px 20px;
`;

const StyledComponentB = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.4px;
  line-height: 18px;
  font-size: 12px;
`;

function Component() {
  return (
    <StyledComponentA className="test test">
      <StyledComponentB>테스트</StyledComponentB>
    </StyledComponentA>
  );
}

export default Component;
