import MultiSort from './index';

it('can sort an array with objects', () => {
    let data = [
        { first_name: "John", last_name: "Doe" },
        { first_name: "Anthony", last_name: "Zipher" },
        { first_name: "Anthony", last_name: "Carlos" }
    ];

    expect(MultiSort(data, "first_name", "ASC")[0].first_name).toBe("Anthony");
    expect(MultiSort(data, ["first_name", "last_name"], ["ASC", "ASC"])[0].last_name).toBe("Carlos");
    expect(MultiSort(data, ["first_name", "last_name"], ["ASC", "DESC"])[0].last_name).toBe("Zipher");
});

it('can sort an object with objects', () => {
    let data = {
        key1: { first_name: "John", last_name: "Doe" },
        key2: { first_name: "Anthony", last_name: "Zipher" },
        key3: { first_name: "Anthony", last_name: "Carlos" }
    };

    expect(MultiSort(data, ["first_name"], ["ASC"])[0].first_name).toBe("Anthony");
    expect(MultiSort(data, ["first_name", "last_name"], ["ASC", "ASC"])[0].last_name).toBe("Carlos");
    expect(MultiSort(data, ["first_name", "last_name"], ["ASC", "DESC"])[0].last_name).toBe("Zipher");
});

it('must have the object key inside of the object', () => {
    let data = {
        key1: { first_name: "John", last_name: "Doe" }
    };

    expect(MultiSort(data, ["first_name"], ["ASC"])[0]._key).toBe("key1");
    expect(MultiSort(data, ["first_name"], ["ASC"], "customKeyName")[0].customKeyName).toBe("key1");
});

it('can handle empty data', () => {
    expect(MultiSort([])).toHaveLength(0);
    expect(MultiSort()).toHaveLength(0);
});

it('throws if is not multidimensional', () => {
    expect(() => MultiSort({ first_name: "John", last_name: "Doe" })).toThrow();
    expect(() => MultiSort(false)).toThrow();
    expect(() => MultiSort(null)).toThrow();
    expect(() => MultiSort([[1, 2, 3, 4]])).toThrow();
    expect(() => MultiSort([[]])).toThrow();
    expect(() => MultiSort([[[1,2,3,4]]])).toThrow();
    expect(() => MultiSort("string")).toThrow();
    expect(() => MultiSort(1234)).toThrow();
    expect(() => MultiSort(true)).toThrow();
});

// it('throws if "columns" parameter are not array or string', () => {
//     let data = [{ first_name: "John", last_name: "Doe" }];

//     expect(() => MultiSort(data, 1234)).toThrow();
//     expect(() => MultiSort(data, {})).toThrow();
//     expect(() => MultiSort(data, [[]])).toThrow();
//     expect(() => MultiSort(data, [{}])).toThrow();
// });

// it('throws if "orderBy" parameter are not array or strings', () => {
//     expect(() => MultiSort(data, null, 1234)).toThrow();
//     expect(() => MultiSort(data, null, {})).toThrow();
//     expect(() => MultiSort(data, null, [[]])).toThrow();
// });

// it('throws if "key" parameter are not strings', () => {
//     expect(() => MultiSort(data, null, null, 1234)).toThrow();
//     expect(() => MultiSort(data, null, null, {})).toThrow();
//     expect(() => MultiSort(data, null, null, [])).toThrow();
// });
