import type { en } from "./en";

type DeepWiden<T> =
  T extends string ? string
    : T extends number ? number
      : T extends boolean ? boolean
        : T extends readonly (infer Item)[] ? readonly DeepWiden<Item>[]
          : T extends object ? { readonly [Key in keyof T]: DeepWiden<T[Key]> }
            : T;

export type CustomContent = DeepWiden<typeof en>;
export type FragmentIcon = typeof en["hero"]["knowledgeFragments"][number]["icon"];
