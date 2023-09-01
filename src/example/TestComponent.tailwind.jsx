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
    <button className="test test block w-full rounded-[16px] py-[15px] px-[20px]">
      <div className="w-full h-[18px] flex justify-between items-center tracking-[-0.4px] leading-[18px] text-xs">
        테스트
      </div>
    </button>
  );
}

export default Component;
