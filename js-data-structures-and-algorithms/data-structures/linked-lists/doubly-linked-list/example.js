// @ts-nocheck
import { DoublyLinkedList } from './doubly-linked-list.js';

// Initialize a new food list using Doubly Linked List
const foodList = new DoublyLinkedList();
console.log('Initial list: ', foodList);

// Push new items to the list
foodList.push('burger');
foodList.push('pizza');
foodList.push('sandwich');
foodList.push('steak');
foodList.push('hotpot');
console.log('New items added: ', foodList);
console.log('New items added as array: ', foodList.print());

// Remove the last item from the list
const lastItem = foodList.pop();
console.log('Last removed item: ', lastItem.value);
console.log(`New list after removing ${lastItem.value} item: `, foodList);
console.log(
  `New list after removing ${lastItem.value} item as array: `,
  foodList.print()
);

// Remove the first item from the list
const firstItem = foodList.shift();
console.log('First removed item: ', firstItem.value);
console.log(`New list after removing ${firstItem.value} item: `, foodList);
console.log(
  `New list after removing ${firstItem.value} item as array: `,
  foodList.print()
);

// Add a new item to the beginning of the list
const newBeginningItem = foodList.unshift('burger');
console.log('New added beginning item: ', newBeginningItem.head.value);
console.log(
  `New list after adding ${newBeginningItem.head.value} item: `,
  foodList
);
console.log(
  `New list after adding ${newBeginningItem.head.value} item as array: `,
  foodList.print()
);

// Get specific item with index
const getItem = foodList.get(2);
console.log('Get item of index 2: ', getItem.value);

// Set a new item value at specified index
const updatedItem = foodList.set(2, 'franchisee');
console.log('New updated item: ', updatedItem);
console.log(`New list after updating to franchisee item: `, foodList);
console.log(
  `New list after updating to franchisee item as array: `,
  foodList.print()
);

// Insert a new item at specified index
const newInsertedItem = foodList.insert(2, 'chicken');
console.log('New inserted item at index of 2: ', updatedItem);
console.log(`New list after inserting chicken item: `, foodList);
console.log(
  `New list after inserting chicken item as array: `,
  foodList.print()
);

// Remove a item at specified index
const removedItem = foodList.remove(2);
console.log('Removed item: ', removedItem.value);
console.log(`New list after removing ${removedItem.value} item: `, foodList);
console.log(
  `New list after removing ${removedItem.value} item as array: `,
  foodList.print()
);
