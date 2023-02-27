export const checkDirtyFieldsForm = (fields: Partial<Readonly<{ [x: string]: boolean }>>) => {
  return !!Object.keys(fields).length;
};
