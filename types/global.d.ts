import "react";

type MapEvents<T> = {
  [K in keyof T as K extends `on${infer E}` ? `on${Lowercase<E>}` : K]: T[K];
};

declare module "react" {
  interface HTMLAttributes<T> {
    slot?: string;
  }
  interface SVGProps<T> {
    slot?: string;
  }
}
