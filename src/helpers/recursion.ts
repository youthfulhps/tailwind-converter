import { AST } from 'prettier';
import {} from 'estree-jsx';

export function recursion(ast: AST) {
  if (!ast.program || !ast.program.body.length) {
    console.error('프로그램 코드가 없음');
  }

  // * 최상단에서 함수 형태로 반환하고 있는 케이스를 찾는다.
  // * 함수 이거나,

  // ast.program.body.forEach((declaration: any) => {
  //   if (declaration)
  // })
}

export function test() {
  return 'a';
}
