[![Build Status](https://travis-ci.org/xiCO2k/multi-sort.svg?branch=master)](https://travis-ci.org/xiCO2k/multi-sort)
[![npm downloads](https://img.shields.io/npm/dt/multi-sort.svg)](https://npmcharts.com/compare/multi-sort?minimal=true)
[![bitHound Code](https://www.bithound.io/github/xiCO2k/multi-sort/badges/code.svg)](https://www.bithound.io/github/xiCO2k/multi-sort)
[![bitHound Dependencies](https://www.bithound.io/github/xiCO2k/multi-sort/badges/dependencies.svg)](https://www.bithound.io/github/xiCO2k/multi-sort/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/xiCO2k/multi-sort/badges/devDependencies.svg)](https://www.bithound.io/github/xiCO2k/multi-sort/master/dependencies/npm)

# multi-sort

[![NPM](https://nodei.co/npm/multi-sort.png?downloads=true&downloadRank=true)](https://npmjs.org/package/multi-sort)

JS Multidimention Sort Helper

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

```javascript
import MultiSort from 'multi-sort';

let arr = [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Anthony', last_name: 'Zipher' },
    { first_name: 'Anthony', last_name: 'Carlos' }
];

let sortedByFirstName = MultiSort(arr, 'first_name', 'ASC');

/* Sort by multi params */
let sortedByFirstAndLast = MultiSort(arr, ['first_name', 'last_name'], ['ASC', 'DESC']);
/* or */
let sortedByFirstAndLast = MultiSort(arr, {
    first_name: 'ASC',
    last_name: 'DESC'
});
```

