/* eslint-disable import/extensions */
import { BASE_URL } from './config.js';
import DB from './db_wrapper.js';
import MessageHandler from './message.js';
import {
  addValidators, isAllValid, isNoneInvalid, validClass,
} from './validator.js';
import { fillTemplate, getFormData, clearForm } from './utils.js';
import templates from './templates.js';

addValidators();
const msgh = new MessageHandler(document.querySelector('.messages'));

const userTable = document.querySelector('.user__table tbody');
const userForm = document.querySelector('.user__add--container');
const addButton = document.querySelector('#button__add');

const users = new DB(BASE_URL);
await users.loadData('users', ['id', 'name', 'emailAddress', 'address']);

const getRowID = (rowID) => `row-${rowID}`;

const constructRow = (data) => {
  const rowID = getRowID(data.id);
  const element = document.createElement('tr');
  element.setAttribute('id', rowID);
  element.innerHTML = fillTemplate(templates.oneUser, data);
  addValidators(element);
  // eslint-disable-next-line no-use-before-define
  addListeners(element, data);
  return element;
};

const addRow = (data) => {
  const element = constructRow(data);
  userTable.insertBefore(element, userTable.firstChild);
};

const replaceRow = (data) => {
  const rowID = getRowID(data.id);
  const oldElement = document.querySelector(`#${rowID}`);
  const element = constructRow(data);
  userTable.replaceChild(element, oldElement);
};

const deleteRow = (element) => {
  element.remove();
};

const addUser = async (data) => {
  try {
    const fullData = await users.insert(data);
    addRow(fullData);
  } catch (err) {
    msgh.showMessage(err, 'error');
  }
};

const updateUser = async (data) => {
  try {
    const fullData = await users.update(data);
    replaceRow(fullData);
  } catch (err) {
    msgh.showMessage(err, 'error');
  }
};

const deleteUser = async (data) => {
  const userID = (Number.isFinite(data)) ? data : data.id;
  try {
    users.delete(userID);
    deleteRow(document.querySelector(`#${getRowID(userID)}`));
    msgh.showMessage('User removed.', 'success');
  } catch (err) {
    msgh.showMessage(err, 'error');
  }
};

const initTable = (allData = []) => {
  allData.forEach(addRow);
};

addButton.addEventListener('click', async () => {
  if (!isAllValid(userForm)) {
    msgh.showMessage('Invalid input!', 'error');
    return true;
  }
  const data = getFormData(userForm);
  await addUser(data);
  msgh.showMessage('User added', 'success');
  clearForm(userForm, validClass);
  return true;
});

initTable(users.selectDataOrderByID());

let userUnderModify = null;

const showModifyError = () => {
  msgh.showMessage('A different user is under modification. Finish that first!');
};

function toModificationMode(row) {
  row.querySelectorAll('button').forEach((element) => element.classList.toggle('hidden'));
  row.querySelectorAll('input:not([name="id"])').forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.disabled = false; // really??
  });
  userUnderModify = row.id;
}

function addListeners(row, data) {
  const { id } = data;
  row.querySelector('.btn-delete').addEventListener('click', () => {
    if (userUnderModify === null) {
      deleteUser(id);
    } else {
      showModifyError();
    }
  });
  row.querySelector('.btn-modify').addEventListener('click', () => {
    if (userUnderModify === null) {
      toModificationMode(row);
    } else {
      showModifyError();
    }
  });
  row.querySelector('.btn-save').addEventListener('click', () => {
    if (isNoneInvalid(row)) {
      updateUser(getFormData(row));
      userUnderModify = null;
      msgh.showMessage('User modified.', 'success');
    } else {
      msgh.showMessage('Invalid data.');
    }
  });
  row.querySelector('.btn-cancel').addEventListener('click', () => {
    updateUser(users.getOneData(id));
    userUnderModify = null;
  });
}

// console.log(users.data);
/*
console.log(users.data[1]);
console.log(users.getData());

const newUser = { name: 'Kacey Stebbings 2',
emailAddress: '2kstebbings0@wix.com', address: '29 Morning Court' };

const addedRes = await users.insert(newUser);
console.log(addedRes);
console.log(users.getData());
console.log('wtf');
console.log(users.getData()[97]);
console.log('wtf??');

addedRes.address = 'sehol';
const updateRes = await users.update(addedRes);
console.log(updateRes);
console.log(users.getData());

const deleteRes = await users.delete(addedRes.id);
console.log(deleteRes);
console.log(users.getData());
console.log(users.selectDataOrderByIDDesc());

const msgh = new MessageHandler(document.querySelector('.messages'));
msgh.showMessage('blabla');
*/
