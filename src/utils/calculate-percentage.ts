export const calculatePercentage = (total: number, part: number) => {
    if (total === 0) {
        return 0;
    }
    console.log(total, part);

    return Math.round((part / total) * 100);
};
