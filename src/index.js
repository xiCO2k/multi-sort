import _ from 'lodash';

function validateData(data) {
    let throwMessage = 'It can\'t sort, validate the data sent';
    if (!data ||
        typeof data === "number" ||
        typeof data === "boolean") {
        throw new Error(throwMessage);
    }


}

function validateKey(key) {
    if (typeof key !== 'string') {
        throw new Error("The key param needs to be a string");
    }
}

function validateParams(data, columns, order_by, key) {
    validateData(data);
    validateKey(key);
}

export default function MultiSort(arr = [], columns = null, order_by = null, key = "_key") {
    validateParams(arr, columns, order_by, key); //it throws

    if (!Array.isArray(arr)) {
        let data = [];

        for (let i in arr) {
            data.push({
                ...arr[i],
                [key]: i
            });
        }

        arr = data;
    }

    if (!arr.length) {
        return [];
    }

    if (Array.isArray(arr[0])) {
        throw new Error("It can't sort, validate the data sent");
    }

    if (typeof columns === "string") {
        columns = [columns];
    }

    if (typeof order_by === "string") {
        order_by = [order_by];
    }

    function multisort_recursive(a, b, columns, order_by, index) {
        let direction = order_by[index] == 'DESC' ? 1 : 0;

        if( _.isBoolean( a[columns[index]] ) || _.isUndefined( a[columns[index]] ) ) a[columns[index]] = a[columns[index]] ? 1 : 0;
        if( _.isBoolean( b[columns[index]] ) || _.isUndefined( b[columns[index]] ) ) b[columns[index]] = b[columns[index]] ? 1 : 0;

        var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);

        var x = is_numeric ?
            +a[columns[index]] :
            _.isArray(a[columns[index]]) ?
                a[columns[index]] :
                ('' + a[columns[index]]).toLowerCase();

        var y = is_numeric ?
            +b[columns[index]] :
            _.isArray(b[columns[index]]) ?
                b[columns[index]] :
                ('' + b[columns[index]]).toLowerCase();

        if(x < y) {
            return direction == 0 ? -1 : 1;
        }

        if(x == y)  {
            return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
        }

        return direction == 0 ? 1 : -1;
    }

    return arr.sort(function (a,b) {
        return multisort_recursive(a,b,columns,order_by,0);
    });
}
