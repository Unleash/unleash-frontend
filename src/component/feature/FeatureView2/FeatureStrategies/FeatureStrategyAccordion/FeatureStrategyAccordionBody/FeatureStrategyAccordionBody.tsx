import DefaultStrategy from '../../../../strategy/EditStrategyModal/default-strategy';
import FlexibleStrategy from '../../common/FlexibleStrategy/FlexibleStrategy';
import UserWithIdStrategy from '../../../../strategy/EditStrategyModal/user-with-id-strategy';
import { IStrategy } from '../../../../../../interfaces/strategy';
import cloneDeep from 'lodash.clonedeep';
import useUnleashContext from '../../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import GeneralStrategy from '../../common/GeneralStrategy/GeneralStrategy';

interface IFeatureStrategyAccordionBodyProps {
    strategy: IStrategy;
    setStrategyParams: () => any;
    updateParameters: () => any;
}

const FeatureStrategyAccordionBody: React.FC<IFeatureStrategyAccordionBodyProps> =
    ({ strategy, updateParameters, children }) => {
        const { strategies } = useStrategies();

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

        const resolveStrategyDefinition = () => {
            const definition = strategies.find(
                definition => definition.name === strategy.name
            );

            return definition;
        };

        const Type = resolveInputType();
        const definition = resolveStrategyDefinition();

        const { parameters } = strategy;

        return (
            <div>
                <Type
                    parameters={parameters}
                    updateParameter={updateParameters}
                    strategyDefinition={definition}
                    context={context}
                    editable
                />
                {children}
            </div>
        );
    };

export default FeatureStrategyAccordionBody;
