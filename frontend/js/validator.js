const regularExpressions = {
  name: /^[A-Z][a-zA-Z-]+( [A-Z][a-zA-Z-]+){1,2}$/,
  email: /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/,
  address: /^\d+( [A-Z][a-z]+){2,}$/,
};

export const validClass = 'validated-passed';
export const invalidClass = 'validated-failed';
const classRegexp = /^validate-(?<kind>[a-z]+)$/;
const classSelector = '*[class*="validate-"]';

export const validate = (s = '', kind = '') => {
  // LOL, ESLint went mad
  if (!Object.prototype.hasOwnProperty.call(regularExpressions, kind)) {
    throw ReferenceError(`Bad validator value: ${kind}`);
  }
  return regularExpressions[kind].test(s);
};

export const removeValidated = (element) => {
  element.classList.remove(invalidClass);
  element.classList.remove(validClass);
};

export const isValid = (element) => element.classList.contains(validClass);
export const isNotInvalid = (element) => !element.classList.contains(invalidClass);

export const isAllValid = (parent = document) => Array.from(parent.querySelectorAll('input')).every((element) => isValid(element));
export const isNoneInvalid = (parent = document) => Array.from(parent.querySelectorAll('input')).every((element) => isNotInvalid(element));

export const validateAddClass = (element = document, kind = '') => {
  try {
    const res = validate(element.value, kind);
    if (res) {
      element.classList.add(validClass);
      element.classList.remove(invalidClass);
    } else {
      element.classList.remove(validClass);
      element.classList.add(invalidClass);
    }
  } catch (err) {
    console.error(err);
  }
};

export const addValidators = (parent = document) => {
  const elements = parent.querySelectorAll(classSelector);
  elements.forEach((element) => {
    element.classList.forEach((cl) => {
      const match = classRegexp.exec(cl);
      if (match) {
        const { kind } = match.groups;
        if (!Object.prototype.hasOwnProperty.call(regularExpressions, kind)) {
          console.error(`Bad validator value: ${kind}`);
        } else {
          element.addEventListener('change', () => {
            validateAddClass(element, kind);
          });
        }
      }
    });
  });
};
