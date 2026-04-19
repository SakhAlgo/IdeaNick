export declare const omit: <TObject extends object, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
) => Omit<TObject, TKeys>
