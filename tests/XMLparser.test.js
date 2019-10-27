const parseXML = require('../parser');
const testArray = [null, undefined, 5, 'string', {value: 3}, false, '<item><title>right value</title>'];
const testRegExp = [
    'left<item><title>right value</title>right',
    '<left><item><title>right value</title></left>right',
    '<item><title>right value</title></item>',
    '<item><title>right value</title>',
    '123-+._<item><title>right value</title></item>?!ABC*()',
];
const testRegExp2 = [
    'right value',
    '<title>right value</title>',
    'item><title>right value</title></item>',
    '<item class=""><title>right value</title><item>',
    '123-+._<name><title>right value</title></name>?!ABC*()',
];
testArray.forEach(value => {
    test(`returning array with value: ${value}`, () => {
        expect(Array.isArray(parseXML(value))).toBeTruthy();
    });
});
testRegExp.forEach((value,idx) => {
    test(`Right RegExp(get values) for item ${idx}`, () => {
        expect(parseXML(value)).toContain('right value');
    });
});
testRegExp2.forEach((value,idx) => {
    test(`Right RegExp(not get values) for item ${idx}`, () => {
        expect(parseXML(value)).not.toContain('right value');
    });
});
