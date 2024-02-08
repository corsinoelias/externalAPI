// A file is required to be in the root of the /src directory by the TypeScript compiler
declare module "*.svg" {
    const content: string;
    export default content;
  }
declare module '*.png' ;
declare module '*.mp3' {
  const src: string
  export default src
}