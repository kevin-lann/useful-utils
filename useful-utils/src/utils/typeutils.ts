export type MakeOptionalExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;