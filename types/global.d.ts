declare module "mathlive" {
  export interface MathfieldElement extends HTMLElement {
    value: string;
    setValue: (value: string) => void;
    getValue: () => string;
    mathVirtualKeyboardPolicy?: string;
    focus: () => void;
    blur: () => void;
  }
  
  interface Window {
    mathVirtualKeyboard: {
      show: () => void;
      hide: () => void;
    };
  }
}