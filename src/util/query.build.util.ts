export const queryBuildILike = (myKey: string, value: any) => {
  return !value
    ? {}
    : Object.defineProperty({}, myKey, {
        value: new RegExp('^' + value + '$', 'i'),
        enumerable: true,
      });
};

export const queryBuildIn = (myKey: string, value: any) => {
  return !value || value.length == 0
    ? {}
    : Object.defineProperty({}, myKey, {
        value: { $in: value },
        enumerable: true,
      });
};
