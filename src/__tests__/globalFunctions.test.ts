import { capitalize, isEmail, isUndefined } from '../globalFunctions';

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

test('empty string', () => {
    expect(isUndefined('')).toEqual(true);
});

test('string type with value', () => {
    expect(isUndefined('hello world')).toEqual(false);
});

let b1: number;
test('number type uninitialized', () => {
    expect(isUndefined(b1)).toEqual(true);
});

let b2: number = NaN;
test('NaN', () => {
    expect(isUndefined(b2)).toEqual(true);
});

test('number type with value', () => {
    expect(isUndefined(42)).toEqual(false);
});

test('number defined as 0', () => {
    expect(isUndefined(0)).toEqual(false);
});

let c1: {};
test('object type uninitialized', () => {
    expect(isUndefined(c1)).toEqual(true);
});

test('object type empty', () => {
    expect(isUndefined({})).toEqual(true);
});

test('object type with value', () => {
    expect(isUndefined({hello: 'world'})).toEqual(false);
});

let d1: string[];
test('string array uninitialized', () => {
    expect(isUndefined(d1)).toEqual(true);
});

test('string array empty', () => {
    expect(isUndefined([])).toEqual(true);
});

test('string array non-empty', () => {
    expect(isUndefined(['hello', 'world', 'from', 'easyPD'])).toEqual(false);
});

test('number array non-empty', () => {
    expect(isUndefined([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0])).toEqual(false);
});

let d5: {id: number, name: string}[] = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bob'}
];
test('object array non-empty', () => {
    expect(isUndefined(d5)).toEqual(false);
});

// is email
test('basic valid case 1', () => {
    expect(isEmail('johndoe@tempmail.com')).toEqual(true);
});

test('basic valid case 2 - numbers', () => {
    expect(isEmail('123john456@mail.ca')).toEqual(true);
});

test('empty string', () => {
    expect(isEmail('')).toEqual(false);
});

test('whitespace', () => {
    expect(isEmail('     ')).toEqual(false);
});

test('no domain', () => {
    expect(isEmail('isabella@easypd')).toEqual(false);
});

test('no @', () => {
    expect(isEmail('isabellaeasypd.co')).toEqual(false);
});

test('several periods', () => {
    expect(isEmail('isabella.enriquez@mail.org')).toEqual(true);
});

test('nothing before @', () => {
    expect(isEmail('@mail.ru')).toEqual(false);
});