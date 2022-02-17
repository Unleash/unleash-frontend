import { StrategyParameter } from './StrategyParameter/StrategyParameter';
import PropTypes from 'prop-types';

function gerArrayWithEntries(num) {
    return Array.from(Array(num));
}

export const StrategyParameters = ({
    input = [],
    count = 0,
    updateParameter,
    setParams,
}) => (
    <div>
        {gerArrayWithEntries(count).map((v, i) => (
            <StrategyParameter
                params={input}
                key={i}
                set={v => updateParameter(i, v)}
                index={i}
                input={input[i]}
                setParams={setParams}
            />
        ))}
    </div>
);

StrategyParameters.propTypes = {
    input: PropTypes.array,
    updateParameter: PropTypes.func.isRequired,
    count: PropTypes.number,
};