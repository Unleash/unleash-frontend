import { useContext } from 'react';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import DefaultStrategy from '../../../../strategy/EditStrategyModal/default-strategy';
import FlexibleStrategy from '../../../../strategy/EditStrategyModal/FlexibleStrategy';
import UserWithIdStrategy from '../../../../strategy/EditStrategyModal/user-with-id-strategy';
import GeneralStrategy from '../../../../strategy/EditStrategyModal/general-strategy';
import { IStrategy } from '../../../../../../interfaces/strategy';

interface IFeatureStrategyAccordionBodyProps {
    strategy: IStrategy;
}

const FeatureStrategyAccordionBody = ({
    strategy,
}: IFeatureStrategyAccordionBodyProps) => {
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
            <Type parameters={parameters} updateParameter={() => {}} />
        </div>
    );
};

export default FeatureStrategyAccordionBody;
