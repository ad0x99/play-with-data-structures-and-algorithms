import { isUnique1, isUnique2 } from './optimizationWithCaching';

describe('isUnique function testing', () => {
  const input1 = [1, 2, 3];
  const input2 = [1, 2, 3, 3];

  test('isUnique1 - should return true', () => {
    expect(typeof isUnique1).toEqual('function');
    expect(isUnique1(input1)).toBeTruthy();
  });

  test('isUnique1 - should return false', () => {
    expect(typeof isUnique1).toEqual('function');
    expect(isUnique1(input2)).toBeFalsy();
  });

  test('isUnique2 - should return true', () => {
    expect(typeof isUnique2).toEqual('function');
    expect(isUnique1(input1)).toBeTruthy();
  });

  test('isUnique2 - should return false', () => {
    expect(typeof isUnique2).toEqual('function');
    expect(isUnique1(input2)).toBeFalsy();
  });
});
