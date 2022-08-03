import React from 'react';
import { IStrategy, IFeatureStrategyParameters } from 'interfaces/strategy';
import { styled } from '@mui/system';
import { StrategyParameter } from 'component/feature/StrategyTypes/StrategyParameter/StrategyParameter';

interface IGeneralStrategyProps {
    parameters: IFeatureStrategyParameters;
    strategyDefinition: IStrategy;
    updateParameter: (field: string, value: string) => void;
    editable: boolean;
}

const StyledContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(4),
}));

const GeneralStrategy = ({
    parameters,
    strategyDefinition,
    updateParameter,
    editable,
}: IGeneralStrategyProps) => {
    if (!strategyDefinition || strategyDefinition.parameters.length === 0) {
        return null;
    }

    return (
        <StyledContainer>
            {strategyDefinition.parameters.map(definition => (
                <div key={definition.name}>
                    <StrategyParameter
                        definition={definition}
                        parameters={parameters}
                        updateParameter={updateParameter}
                        editable={editable}
                    />
                </div>
            ))}
        </StyledContainer>
    );
};

export default GeneralStrategy;
