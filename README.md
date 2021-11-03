[![npm downloads](https://img.shields.io/npm/dt/multi-sort.svg)](https://npmcharts.com/compare/multi-sort?minimal=true)

# multi-sort

[![NPM](https://nodei.co/npm/multi-sort.png?downloads=true&downloadRank=true)](https://npmjs.org/package/multi-sort)

This package allows you to sort a multi dimensional array easily.

## Installation
With [npm](https://www.npmjs.com):
```sh
$ npm i multi-sort
```
or with [yarn](https://yarnpkg.com):
```sh
$ yarn add multi-sort
```

## Usage

There are multiple ways to use this package, check the example bellow:

```js
import MultiSort from 'multi-sort';

const arr = [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Anthony', last_name: 'Zipher' },
    { first_name: 'Anthony', last_name: 'Carlos' },
];
```

With arguments providing the object `key` and the `direction`:

```js
const sortedByFirstName = MultiSort(arr, 'first_name', 'ASC');
```

With arguments providing an array of object `keys` and `directions`:

```js
const sortedByFirstAndLast = MultiSort(
    arr,
    ['first_name', 'last_name'],
    ['ASC', 'DESC']
);
```

Or, With an Object where the `key` represents the object `key` on the array provided and the `value` represents
the `direction`:

```js
const sortedByFirstAndLast = MultiSort(arr, {
    first_name: 'ASC',
    last_name: 'DESC',
});
```

MultiSort is an open-sourced software licensed under the **[MIT license](https://opensource.org/licenses/MIT)**.
