import { Fixture, baseOptions } from './setting';
import { format } from 'prettier';

const options = {
  ...baseOptions,
  parser: 'babel',
};

const fixtures: Fixture[] = [
  {
    name: 'tailwind-converter/base',
    input: `import React from 'react';
import styled from 'styled-components';

const StyledComponentA = styled.button\`
  display: block;
  width: 100%;
  border-radius: 16px;
  padding: 15px 20px;
\`;

const StyledComponentB = styled.div\`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.4px;
  line-height: 18px;
  font-size: 12px;
\`;

function Component() {
  return (
    <StyledComponentA className="test test">
      <StyledComponentB>test</StyledComponentB>
    </StyledComponentA>
  );
}

export default Component;
`,
    output: `import React from "react";
import styled from "styled-components";

const StyledComponentA = styled.button\`
  display: block;
  width: 100%;
  border-radius: 16px;
  padding: 15px 20px;
\`;

const StyledComponentB = styled.div\`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.4px;
  line-height: 18px;
  font-size: 12px;
\`;

function Component() {
  return (
    <button className="test test block w-full rounded-[16px] py-[15px] px-[20px]">
      <div className="w-full h-[18px] flex justify-between items-center tracking-[-0.4px] leading-[18px] text-xs">
        test
      </div>
    </button>
  );
}

export default Component;
`,
  },
];

describe('tailwind-converter', () => {
  for (const { name, input, output } of fixtures) {
    test(
      name,
      async () => {
        expect(await format(input, options)).toBe(output);
      },
      10000,
    );
  }
});
