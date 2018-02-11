// Jest tests
import { range, required } from './validator';

test('Required validator', () => {
  expect(required``(false)).toBeTruthy();
  expect(required``('')).toBeTruthy();
  expect(required``(null)).toBeTruthy();
  expect(required``('Hello world')).toBeUndefined();
});

test('Invert validator', () => {
  expect(required.inverse``(false)).toBeUndefined();
  expect(required.inverse``('Hello world')).toBeTruthy();
});

test('Range validator', () => {
  expect(range(1, 3)``(2)).toBeUndefined();
  expect(range(2, 4)``(2)).toBeUndefined();
  expect(range(2, 4)``(5)).toBeTruthy();
  expect(range(2, 4, false)``(2)).toBeTruthy();
  expect(range(2, 4, false)``(3)).toBeUndefined();
});

test('Range with custom comparator', () => {
  expect(range(12, 6, true, (value, bound) => bound - value)``(8)).toBeUndefined();
});
