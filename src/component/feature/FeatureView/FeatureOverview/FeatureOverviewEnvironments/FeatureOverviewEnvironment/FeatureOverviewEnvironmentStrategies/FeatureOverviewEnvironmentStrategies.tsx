import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { IFeatureStrategy } from 'interfaces/strategy';
import { Fragment } from 'react';
import FeatureOverviewEnvironmentStrategy from './FeatureOverviewEnvironmentStrategy/FeatureOverviewEnvironmentStrategy';

interface IFeatureOverviewEnvironmentStrategiesProps {
    strategies: IFeatureStrategy[];
    environmentName: string;
}

const FeatureOverviewEnvironmentStrategies = ({
    strategies,
    environmentName,
}: IFeatureOverviewEnvironmentStrategiesProps) => {
    return (
        <>
            {strategies.map((strategy, index) => (
                <Fragment key={strategy.id}>
                    <ConditionallyRender
                        condition={index > 0}
                        show={<StrategySeparator text="OR" />}
                    />
                    <FeatureOverviewEnvironmentStrategy
                        strategy={strategy}
                        environmentId={environmentName}
                    />
                </Fragment>
            ))}
        </>
    );
};

export default FeatureOverviewEnvironmentStrategies;
