export const getFormData = (parent = document) => Array.from(parent.querySelectorAll('input'))
  .map((inputElement) => [inputElement.name, inputElement.value])
  .reduce((prev, curr) => {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    prev[curr[0]] = curr[1];
    return prev;
  }, {});

export const clearForm = (parent = document, clearClass = null) => Array.from(parent.querySelectorAll('input'))
  .forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.value = '';
    if (clearClass) {
      element.classList.remove(clearClass);
    }
  });

export const fillTemplate = (template = '', data = {}) => Object
  .entries(data)
  .reduce(
    (prev, [key, value]) => prev
      .replace(RegExp(`{{[ ]*${key}[ ]*}}`, 'gi'), value),
    template,
  );
