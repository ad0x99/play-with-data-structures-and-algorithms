import { CircularLinkedList } from './circular-linked-list';

const foodList = new CircularLinkedList();

foodList.append(10);
foodList.append(20);
foodList.insertAt(1, 15);
foodList.removeAt(2);
console.log(foodList.get(0)); // Output: 1
