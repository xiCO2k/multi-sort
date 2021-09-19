function validateData(data): void {
  if (!data || typeof data !== 'object' ||
    (Array.isArray(data) && data.length && (Array.isArray(data[0]) || typeof data[0] !== 'object'))
  ) {
    throw new Error('It can\'t sort, validate the data sent');
  }
}

function validateKey(key): void {
  if (typeof key !== 'string') {
    throw new Error('The key param needs to be a string');
  }
}

function validateParams(data, columns, orderBy, key): void {
  validateData(data);
  validateKey(key);
}

function isObject(data): boolean {
  return data !== null &&
    typeof data === 'object' &&
    !Array.isArray(data);
}

interface Arguments {
  columns: Array<string>,
  orderBy: Array<string>,
  key: string,
}

function formatArguments(args: Array<any>): Arguments {
  let columns = [];
  let orderBy = [];
  let key = '_key';

  // If is Object
  if (isObject(args[0])) {
    Object.entries(args[0]).forEach(([column, direction]) => {
      columns.push(column);
      orderBy.push(direction);
    });

    key = args[1] || key;
  } else {
    [columns, orderBy] = args;

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

function formatData(arr, key): Array<any> {
  if (Array.isArray(arr)) {
    return arr;
  }

  const data = [];

  Object.keys(arr).forEach(i => {
    data.push({ ...arr[i], [key]: i });
  });

  return data;
}

function getValue(column, item): any {
  column = column.split('.');

  let value = item;
  column.forEach((col) => {
    value = value[col];
  });

  if (typeof value === 'boolean' ||
        typeof value === 'undefined') {
    value = value ? 1 : 0;
  }

  return value;
}

function sort(a, b, columns, orderBy, index): number {
  const direction = orderBy[index] === 'DESC' ? 1 : 0;
  const aValue = getValue(columns[index], a);
  const bValue = getValue(columns[index], b);

  const isNumeric = !Number.isNaN(+aValue - +bValue);
  const x = isNumeric
    ? +aValue : Array.isArray(aValue)
      ? aValue : (`${aValue}`).toLowerCase();

  const y = isNumeric
    ? +bValue : Array.isArray(bValue)
      ? bValue : (`${bValue}`).toLowerCase();

  if (x < y) {
    return direction === 0 ? -1 : 1;
  }

  if (x === y) {
    return columns.length - 1 > index ? sort(a, b, columns, orderBy, index + 1) : 0;
  }

  return direction === 0 ? 1 : -1;
}

export default function MultiSort(
  arr: Array<any> = [],
  ...args: Array<any>
): Array<any> {
  const { columns, orderBy, key } = formatArguments(args);
  validateParams(arr, columns, orderBy, key); // it throws
  return formatData(arr, key).sort((a, b) => sort(a, b, columns, orderBy, 0));
}
