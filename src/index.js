function validateData(data) {
    if (!data || typeof data !== 'object' ||
        Array.isArray(data) && data.length &&
        (Array.isArray(data[0]) || typeof data[0] !== 'object')) {
        throw new Error('It can\'t sort, validate the data sent');
    }
}

function validateKey(key) {
    if (typeof key !== 'string') {
        throw new Error('The key param needs to be a string');
    }
}

function validateParams(data, columns, orderBy, key) {
    validateData(data);
    validateKey(key);
}

function formatArguments(data = [], args) {
    let columns = [],
        orderBy = [],
        key = '_key';

    //If is Object
    if (args[0] !== null &&
        typeof args[0] === 'object' &&
        !Array.isArray(args[0])) {

        for (let column in args[0]) {
            columns.push(column);
            orderBy.push(args[0][column]);
        }

        key = args[1] || key;
    } else {
        columns = args[0];
        orderBy = args[1];

        if (typeof columns === 'string') {
            columns = [columns];
        }

        if (typeof orderBy === 'string') {
            orderBy = [orderBy];
        }

        key = args[2] || key;
    }

    return { columns, orderBy, key };
}

function formatData(arr, key) {
    if (Array.isArray(arr)) {
        return arr;
    }

    let data = [];

    for (let i in arr) {
        data.push({ ...arr[i], [key]: i });
    }

    return data;
}

function sort(a, b, columns, orderBy, index) {
    let direction = orderBy[index] == 'DESC' ? 1 : 0;

    if (typeof a[columns[index]] === 'boolean' ||
        typeof a[columns[index]] === 'undefined') {
        a[columns[index]] = a[columns[index]] ? 1 : 0;
    }

    if (typeof b[columns[index]] === 'boolean' ||
        typeof b[columns[index]] === 'undefined') {
        b[columns[index]] = b[columns[index]] ? 1 : 0;
    }

    let isNumeric = !isNaN(+a[columns[index]] - +b[columns[index]]),
        x = isNumeric ?
            +a[columns[index]] :
            Array.isArray(a[columns[index]]) ?
                a[columns[index]] :
                ('' + a[columns[index]]).toLowerCase(),
        y = isNumeric ?
            +b[columns[index]] :
            Array.isArray(b[columns[index]]) ?
                b[columns[index]] :
                ('' + b[columns[index]]).toLowerCase();

    if (x < y) {
        return direction == 0 ? -1 : 1;
    }

    if (x == y)  {
        return columns.length - 1 > index ? sort(a, b, columns, orderBy, index+1) : 0;
    }

    return direction == 0 ? 1 : -1;
}

export default function MultiSort(arr = [], ...args) {
    let { columns, orderBy, key } = formatArguments(arr, args);
    validateParams(arr, columns, orderBy, key); //it throws
    return formatData(arr, key).sort((a, b) => sort(a, b, columns, orderBy, 0));
}
