import startLog from '.';

describe('startLog는 인사말을 반환한다.', () => {
  it('Hello john', () => {
    expect(startLog('john')).toEqual('Hello john');
  });
});
