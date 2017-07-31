// Jest tests
import validator, { required, range } from './validator';

test('Required validator', () => {
	expect(required``(false)).toBeTruthy();
	expect(required``('')).toBeTruthy();
	expect(required``(null)).toBeTruthy();
	expect(required``('Hello world')).toBeFalsy();
});

test('Invert validator', () => {
	expect(required.inverse``(false)).toBeFalsy();
	expect(required.inverse``('Hello world')).toBeTruthy();
});

test('Range validator', () => {
	expect(range(1, 3)``(2)).toBeFalsy();
	expect(range(2, 4)``(2)).toBeFalsy();
	expect(range(2, 4)``(5)).toBeTruthy();
	expect(range(2, 4, false)``(2)).toBeTruthy();
	expect(range(2, 4, false)``(3)).toBeFalsy();
});
