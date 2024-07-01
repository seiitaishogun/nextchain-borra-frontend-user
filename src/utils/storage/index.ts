const parseJSON = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const stringifyJSON = (value: any) => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return value;
  }
};

export { parseJSON, stringifyJSON };
