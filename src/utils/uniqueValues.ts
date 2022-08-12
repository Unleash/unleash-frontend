export const uniqueValues = <T>(values: T[]): T[] => {
    return Array.from(new Set(values));
};
