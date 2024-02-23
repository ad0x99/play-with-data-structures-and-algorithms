/**
 * The function takes a linked list and a name as input, and returns a string representation of the
 * linked list as an array.
 * @param head - The `head` parameter is the starting node of a linked list.
 * @param dsName - The `dsName` parameter represents the name of the data structure that you want to
 * print.
 * @returns a string that represents the given data structure (dsName) as an array. The array contains
 * the values of each node in the linked list starting from the head node.
 */
export const printAsArray = (head, dsName) => {
  let array = [];
  let current = head;

  while (current) {
    array.push(current.value);
    current = current.next;
  }

  console.log(`${dsName} as Array:`, array);
  return;
};
