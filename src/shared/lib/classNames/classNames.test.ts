import { classNames } from './classNames';

describe('className', () => {
    test('with only first param', () => {
        expect(classNames('S')).toBe('S');
    });
    test('with additional class', () => {
        const expected = 'S class1 class2';
        expect(classNames('S', {}, ['class1', 'class2'])).toBe(expected);
    });
    test('with mods', () => {
        const expected = 'S class3 class1';
        expect(classNames('S', { class1: true, class2: false }, ['class3'])).toBe(
            expected,
        );
    });
    test('with undefined', () => {
        const expected = 'S class3 class1';
        expect(
            classNames('S', { class1: true, class2: undefined }, ['class3']),
        ).toBe(expected);
    });
});
