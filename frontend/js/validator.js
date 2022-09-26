const regularExpressions = {
  name: /^[A-Z][a-zA-Z-]+( [A-Z][a-zA-Z-]+){1,2}$/,
  email: /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-])+$/,
  address: /^\d+( [A-Z][a-z]+){2,}$/,
};

const validClass = 'validated-passed';
const invalidClass = 'validated-failed';

export const validate = (s = '', kind = '') => {
  // LOL, ESLint went mad
  if (!Object.prototype.hasOwnProperty.call(regularExpressions, kind)) {
    throw ReferenceError(`Bad validator value: ${kind}`);
  }
  return regularExpressions[kind].test(s);
};

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

const classRegexp = /^validate-(?<kind>[a-z]+)$/;
export const addValidators = (parent = document) => {
  const elements = parent.querySelectorAll('*[class*="validate-"]');
  elements.forEach((element) => {
    element.classList.forEach((cl) => {
      const match = classRegexp.exec(cl);
      if (match) {
        const { kind } = match;
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
