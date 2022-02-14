import { truncateString } from './truncate-string';

test('truncateString', () => {
    expect(truncateString('123', 4)).toEqual('123');
    expect(truncateString('123', 3)).toEqual('123');
    expect(truncateString('123', 2)).toEqual('12...');
    expect(truncateString('123', 1)).toEqual('1...');
    expect(truncateString('123', 0)).toEqual('...');
});
