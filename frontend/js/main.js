/* eslint-disable import/extensions */
import { BASE_URL } from './config.js';
import DB from './db_wrapper.js';
import MessageHandler from './message.js';

const users = new DB(BASE_URL);
await users.loadData('users', ['id', 'name', 'emailAddress', 'address']);
// console.log(users.data);
console.log(users.data[1]);
console.log(users.getData());

const newUser = { name: 'Kacey Stebbings 2', emailAddress: '2kstebbings0@wix.com', address: '29 Morning Court' };
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

const msgh = new MessageHandler(document.querySelector('.messages'));
msgh.showMessage('blabla');
