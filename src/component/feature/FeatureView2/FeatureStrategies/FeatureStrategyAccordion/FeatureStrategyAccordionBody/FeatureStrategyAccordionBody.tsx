import DefaultStrategy from '../../../../strategy/EditStrategyModal/default-strategy';
import FlexibleStrategy from '../../../../strategy/EditStrategyModal/FlexibleStrategy';
import UserWithIdStrategy from '../../../../strategy/EditStrategyModal/user-with-id-strategy';
import GeneralStrategy from '../../../../strategy/EditStrategyModal/general-strategy';
import { IStrategy } from '../../../../../../interfaces/strategy';
import cloneDeep from 'lodash.clonedeep';
import useUnleashContext from '../../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';

interface IFeatureStrategyAccordionBodyProps {
    strategy: IStrategy;
    setStrategyParams: () => any;
}

const FeatureStrategyAccordionBody: React.FC = ({
    strategy,
    updateParameters,
    children,
}: IFeatureStrategyAccordionBodyProps) => {
    const { context } = useUnleashContext();

    const resolveInputType = () => {
        switch (strategy?.name) {
            case 'default':
                return DefaultStrategy;
            case 'flexibleRollout':
                return FlexibleStrategy;
            case 'userWithId':
                return UserWithIdStrategy;
            default:
                return GeneralStrategy;
        }
    };

    const Type = resolveInputType();

    const { parameters } = strategy;

    return (
        <div>
            <Type
                parameters={parameters}
                updateParameter={updateParameters}
                strategyDefinition={{ ...cloneDeep(strategy) }}
                context={context}
                editable
            />
            {children}
        </div>
    );
};

export default FeatureStrategyAccordionBody;
