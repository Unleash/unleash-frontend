import { StrategyParameter } from './StrategyParameter/StrategyParameter';
import React from 'react';
import { ICustomStrategyParameter } from 'interfaces/strategy';

function gerArrayWithEntries(num: number) {
    return Array.from(Array(num));
}

interface IStrategyParametersProps {
    input: ICustomStrategyParameter[];
    count: number;
    updateParameter: (index: number, updated: object) => void;
    setParams: React.Dispatch<React.SetStateAction<ICustomStrategyParameter[]>>;
    errors: { [key: string]: string };
}

export const StrategyParameters = ({
    input = [],
    count = 0,
    updateParameter,
    setParams,
    errors,
}: IStrategyParametersProps) => (
    <div>
        {gerArrayWithEntries(count).map((v, i) => (
            <StrategyParameter
                params={input}
                key={i}
                set={v => updateParameter(i, v)}
                index={i}
                input={input[i]}
                setParams={setParams}
                errors={errors}
            />
        ))}
    </div>
);
