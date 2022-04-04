export interface Collection {
    _id: string;
}

export type MakePartialBoolean<Type> = {
    [Key in keyof Type]?: Type[Key] extends {[k: string]: any} | undefined
        ? MakePartialBoolean<Type[Key]>
        : boolean;
};
