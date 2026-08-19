/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file ensures TypeScript recognizes CSS imports
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}