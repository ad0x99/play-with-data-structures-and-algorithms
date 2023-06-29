import { Stack } from './stack.js';

const stack = new Stack();

stack.push(12);
stack.push(10);
stack.push(49);
stack.push(76);
console.log('New stack created: ', stack);

stack.pop();
console.log('New stack after pop: ', stack);
