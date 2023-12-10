export type StyleRule = {
  type: string;
  selectors: string[];
  declarations: StyleDeclaration[];
  position: any;
};

export type StyleDeclaration = {
  type: string;
  property: string;
  value: string;
  position: any;
};

export type ComponentDeclaration = {
  name: string;
  tag: string;
  styles: StyleRule[];
};
