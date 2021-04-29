import { formatPathUtil } from './format-path';

test('format path formats a relative path correctly', () => {
    const result = formatPathUtil('login');

    expect(result).toBe('/login');
});

test('format path formats an absolute path correctly', () => {
    const result = formatPathUtil('/login');

    expect(result).toBe('/login');
});

test('format path formats a relative path correctly with basePath', () => {
    const result = formatPathUtil('login', 'hosted');

    expect(result).toBe('/hosted/#/login');
});

test('format path formats an absolute path correctly with basePath', () => {
    const result = formatPathUtil('/login', 'hosted');

    expect(result).toBe('/hosted/#/login');
});

test('format path handles absolute basePath', () => {
    const result = formatPathUtil('/login', '/hosted');

    expect(result).toBe('/hosted/#/login');
});
