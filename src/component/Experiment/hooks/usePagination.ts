import { useEffect, useState } from 'react';

const paginate = <T extends Record<string, any>>(data: T[], limit: number) => {
    let result = [];
    let currentIdx = 0;

    if (data.length <= currentIdx) {
        return [data];
    }

    while (currentIdx < data.length) {
        if (currentIdx === 0) {
            currentIdx += limit;
            const page = data.slice(0, currentIdx);
            result.push(page);
        } else {
            const page = data.slice(currentIdx, currentIdx + limit);
            currentIdx += limit;
            result.push(page);
        }
    }

    return result;
};

export const usePagination = <T extends Record<string, any>>(
    data: T[],
    limit: number
) => {
    const [paginatedData, setPaginatedData] = useState<T[][]>([[]]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        let dataToPaginate = data;

        const result = paginate(dataToPaginate, limit);
        setPaginatedData(result);
        /* eslint-disable-next-line */
    }, [JSON.stringify(data), limit]);

    const nextPage = () => {
        if (pageIndex < paginatedData.length - 1) {
            setPageIndex(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (pageIndex > 0) {
            setPageIndex(prev => prev - 1);
        }
    };

    const lastPage = () => {
        setPageIndex(paginatedData.length - 1);
    };

    const firstPage = () => {
        setPageIndex(0);
    };

    return {
        page: paginatedData[pageIndex] || [],
        pages: paginatedData,
        nextPage,
        prevPage,
        lastPage,
        firstPage,
        setPageIndex,
        pageIndex,
    };
};
