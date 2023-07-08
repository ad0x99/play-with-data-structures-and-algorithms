import { HashTable } from './hash-tables.js';

const hashTable = new HashTable();

console.log('===========Start of Setting - Hash Table ===========');
hashTable.set('hash', 'table');
hashTable.set('laptop', 'macbook');
hashTable.set('phone', 'iphone 14');
hashTable.set('phone', 'iphone 15');

console.log(hashTable);
console.log(hashTable.printHashTableAsArray());
console.log('===========End of Setting - Hash Table ===========');

console.log('===========Start of Getting - Hash Table ===========');
const getValueOfHashKey = hashTable.get('hash');
const getValueOfLaptopKey = hashTable.get('laptop');
const getValueOfPhoneKey = hashTable.get('phone');
const returnUndefined = hashTable.get('hello');

console.log('getValueOfHashKey:', getValueOfHashKey);
console.log('getValueOfLaptopKey:', getValueOfLaptopKey);
console.log('getValueOfPhoneKey:', getValueOfPhoneKey);
console.log('returnUndefined:', returnUndefined);
console.log('===========End of Getting - Hash Table ===========');

console.log(
  '===========Start of Getting all keys and values - Hash Table ==========='
);

const keys = hashTable.getKeysOrValues(0);
const values = hashTable.getKeysOrValues(1);

console.log('keys:', keys);
console.log('values:', values);
console.log(
  '===========End of Getting all keys and values - Hash Table ==========='
);
