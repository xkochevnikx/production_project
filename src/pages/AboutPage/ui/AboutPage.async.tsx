import { lazy } from "react";

export const AboutPageAsync = lazy(
   () =>
      new Promise((resolve) => {
         // @ts-ignore
         // в рельных проектах так делать нельзя
         setTimeout(() => resolve(import("./AboutPage")), 2000);
      })
);
