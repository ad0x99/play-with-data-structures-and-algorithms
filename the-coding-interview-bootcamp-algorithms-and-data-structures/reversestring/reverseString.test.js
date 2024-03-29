import { reverse, reverse2, reverse3 } from './reverseString.js';

test('Reverse function exists', () => {
  expect(reverse).toBeDefined();
  expect(reverse2).toBeDefined();
  expect(reverse3).toBeDefined();
});

test('Reverse reverses a string', () => {
  expect(reverse('abcd')).toEqual('dcba');
  expect(reverse2('abcd')).toEqual('dcba');
  expect(reverse3('abcd')).toEqual('dcba');
});

test('Reverse reverses a string', () => {
  expect(reverse('  abcd')).toEqual('dcba  ');
  expect(reverse2('  abcd')).toEqual('dcba  ');
  expect(reverse3('  abcd')).toEqual('dcba  ');
});
