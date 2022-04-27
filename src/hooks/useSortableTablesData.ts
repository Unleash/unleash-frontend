import { useState } from 'react';

type SortableHeaderFunctionName = 'text' | 'date';

export type SortableHeader = {
    name: string;
    onClick: SortableHeaderFunctionName | (() => void);
};

const getFirstArrayItem = (data: any[]) => {
    if (data.length > 0) {
        return data[0];
    }
};

export const useSortableTablesData = (
    headers: SortableHeader[],
    tableData: any
) => {
    const [data, setData] = useState(tableData);

    const [sortMetaData, setSortMetaData] = useState({
        desc: true,
        type: getFirstArrayItem(data).name || '',
    });

    const createHeaderData = () => {
        return headers.map(header => ({
            ...header,
            onClick: getSortFunction(header),
        }));
    };

    const sortByText = () => {
        console.log("I'm sorting by text");

        setData((prev: any) => prev);
        setSortMetaData(prev => ({ desc: !prev.desc, type: 'text' }));
    };

    const sortByDate = () => {
        console.log("I'm sorting by date");

        setData((prev: any) => prev);
        setSortMetaData(prev => ({ desc: !prev.desc, type: 'date' }));
    };

    const getSortFunction = (header: SortableHeader) => {
        if (header.onClick instanceof Function) {
            return () => {
                // @ts-expect-error
                header.onClick();
                setSortMetaData(prev => ({
                    desc: !prev.desc,
                    type: header.name,
                }));
            };
        }

        switch (header.onClick) {
            case 'text':
                return sortByText;
            case 'date':
                return sortByDate;
        }
    };

    return {
        headerData: createHeaderData(),
        tableData: data,
        setData,
        sortMetaData,
    };
};
