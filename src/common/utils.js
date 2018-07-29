export const pipe = (inputs, ...args) => {
  try {
    return args.reduce((output, f) => {
      output = f(...output);
      return [output];
    }, inputs);
  } catch (err) {
    console.log(err);
    throw new Error("Pipe Error");
  }
};
