// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as CSS from "csstype";

//
// This fixes typing errors when using CSS variables.
// This is the recommended solution for this problem as of May 2020.
// For more, see: https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
//

declare module "csstype" {
  interface Properties {
    "--goodModal-timeoutMs"?: string;
    "--windowInnerHeight"?: string;
  }
}
