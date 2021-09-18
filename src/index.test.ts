import MultiSort from './index';

it('can sort an array with objects', () => {
  const data = [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Anthony', last_name: 'Zipher' },
    { first_name: 'Anthony', last_name: 'Carlos' },
  ];

  expect(MultiSort(data, 'first_name', 'ASC')[0].first_name).toBe('Anthony');
  expect(MultiSort(data, ['first_name', 'last_name'], ['ASC', 'ASC'])[0].last_name).toBe('Carlos');
  expect(MultiSort(data, ['first_name', 'last_name'], ['ASC', 'DESC'])[0].last_name).toBe('Zipher');
  expect(MultiSort(data, { first_name: 'ASC', last_name: 'DESC' })[0].last_name).toBe('Zipher');
});

it('can sort an object with objects', () => {
  const data = {
    key1: { first_name: 'John', last_name: 'Doe' },
    key2: { first_name: 'Anthony', last_name: 'Zipher' },
    key3: { first_name: 'Anthony', last_name: 'Carlos' },
  };

  expect(MultiSort(data, 'first_name', 'ASC')[0].first_name).toBe('Anthony');
  expect(MultiSort(data, ['first_name', 'last_name'], ['ASC', 'ASC'])[0].last_name).toBe('Carlos');
  expect(MultiSort(data, ['first_name', 'last_name'], ['ASC', 'DESC'])[0].last_name).toBe('Zipher');
});

it('can sort an object by child objects', () => {
  const data = {
    key1: { name: { first: 'John', last: 'Doe' } },
    key2: { name: { first: 'Anthony', last: 'Zipher' } },
    key3: { name: { first: 'Anthony', last: 'Carlos' } },
  };

  const result = MultiSort(data, ['name.first', 'name.last'], ['ASC', 'ASC']);
  expect(result[0].name.first).toBe('Anthony');
  expect(result[0].name.last).toBe('Carlos');
});

it('must have the object key inside of the object', () => {
  const data = {
    key1: { first_name: 'John', last_name: 'Doe' },
  };

  expect(MultiSort(data, ['first_name'], ['ASC'])[0]._key).toBe('key1');
  expect(MultiSort(data, ['first_name'], ['ASC'], 'customKeyName')[0].customKeyName).toBe('key1');
  expect(MultiSort(data, 'first_name', 'ASC', 'customKeyName')[0].customKeyName).toBe('key1');
  expect(MultiSort(data, { first_name: 'ASC' }, 'customKeyName')[0].customKeyName).toBe('key1');
});

it('can handle empty data', () => {
  expect(MultiSort([])).toHaveLength(0);
  expect(MultiSort()).toHaveLength(0);
});

it('throws if is not multidimensional', () => {
  expect(() => MultiSort({ first_name: 'John', last_name: 'Doe' })).toThrow();
  expect(() => MultiSort(false)).toThrow();
  expect(() => MultiSort(null)).toThrow();
  expect(() => MultiSort([[1, 2, 3, 4]])).toThrow();
  expect(() => MultiSort([[]])).toThrow();
  expect(() => MultiSort([[[1, 2, 3, 4]]])).toThrow();
  expect(() => MultiSort('string')).toThrow();
  expect(() => MultiSort(1234)).toThrow();
  expect(() => MultiSort(true)).toThrow();
});

it('throws if the key is not string', () => {
  expect(() => MultiSort([{ first_name: '1' }], 'first_name', 'ASC', 1234)).toThrow();
  expect(() => MultiSort([{ first_name: '1' }], 'first_name', 'ASC', { foo: 'bar' })).toThrow();
});
