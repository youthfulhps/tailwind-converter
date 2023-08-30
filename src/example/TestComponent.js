import React from 'react';
import styled from 'styled-components';

const StyledComponentA = styled.div`
  display: flex;
  font-size: 11px;
  font-weight: bold;
  line-height: 1.25rem;
  letter-spacing: 12px;
  font-family: Proxima Nova, system-ui, sans-serif;
  font-style: normal;
  text-align: right;
  margin: 5px;
  margin-bottom: 4px;
  height: 100vh;
  width: 0;
`;

const StyledComponentB = styled.span`
  display: block;
  font-size: 8em;
`;

const StyledComponentC = styled.span`
  display: block;
  font-size: 8em;
`;

const StyledComponentD = styled.span`
  display: flex;
  flex-direction: column;
`;

function Component() {
  return (
    <StyledComponentA className="test" style={{ display: 'flex' }}>
      <StyledComponentB className={'test a-1'}>
        <StyledComponentC className={'tt aa'}>test</StyledComponentC>
        <StyledComponentD classname={'test'} />
      </StyledComponentB>
    </StyledComponentA>
  );
}

export default Component;
