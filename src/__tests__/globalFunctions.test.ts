import { capitalize, isUndefined } from '../globalFunctions';

// TODO: write tests for isEmail

// capitalize
test('lowercased word', () => {
    expect(capitalize('hello')).toEqual('Hello');
});

test('lowercased first letter', () => {
    expect(capitalize('wORLD')).toEqual('WORLD');
});

test('all caps word', () => {
    expect(capitalize('EASYPD')).toEqual('EASYPD');
});

// isUndefined
let a1: string;
test('string type uninitialized', () => {
    expect(isUndefined(a1)).toEqual(true);
});

let a2: string = '';
test('empty string', () => {
    expect(isUndefined(a2)).toEqual(true);
});

let a3: string = 'hello world'
test('string type with value', () => {
    expect(isUndefined(a3)).toEqual(false);
});

let b1: number;
test('number type uninitialized', () => {
    expect(isUndefined(b1)).toEqual(true);
});

let b2: number = NaN;
test('NaN', () => {
    expect(isUndefined(b2)).toEqual(true);
});

let b3: number = 42;
test('number type with value', () => {
    expect(isUndefined(b3)).toEqual(false);
});

let b4: number = 0;
test('number defined as 0', () => {
    expect(isUndefined(b4)).toEqual(false);
});

let c1: {};
test('object type uninitialized', () => {
    expect(isUndefined(c1)).toEqual(true);
});

let c2: {} = {};
test('object type empty', () => {
    expect(isUndefined(c2)).toEqual(true);
});

let c3 = {
    hello: 'world'
};
test('object type with value', () => {
    expect(isUndefined(c3)).toEqual(false);
});

let d1: string[];
test('string array uninitialized', () => {
    expect(isUndefined(d1)).toEqual(true);
});

let d2: boolean[] = [];
test('string array empty', () => {
    expect(isUndefined(d2)).toEqual(true);
});

let d3: string[] = ['hello', 'world', 'from', 'easyPD'];
test('string array non-empty', () => {
    expect(isUndefined(d3)).toEqual(false);
});

let d4: number[] = [1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0];
test('number array non-empty', () => {
    expect(isUndefined(d4)).toEqual(false);
});

let d5: {id: number, name: string}[] = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bob'}
];
test('object array non-empty', () => {
    expect(isUndefined(d5)).toEqual(false);
});