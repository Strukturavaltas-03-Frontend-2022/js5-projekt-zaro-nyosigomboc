const regularExpressions = {
  name: /^[A-Z][a-zA-Z-]+( [A-Z][a-zA-Z-]+){1,2}$/,
  email: /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-])+$/,
  address: /^\d+( [A-Z][a-z]+){2,}$/,
};

const validate = (s = '', kind = '') => {
  // LOL, ESLint went mad
  if (!Object.prototype.hasOwnProperty.call(regularExpressions, kind)) {
    throw ReferenceError(`Bad validator value: ${kind}`);
  }
  return regularExpressions[kind].test(s);
};
