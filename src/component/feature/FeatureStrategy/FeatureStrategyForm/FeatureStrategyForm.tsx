import React, { useState } from 'react';
import { IFeatureStrategy } from 'interfaces/strategy';
import {
    getFeatureStrategyIcon,
    getHumanReadableStrategyName,
} from 'utils/strategy-names';
import { FeatureStrategyType } from '../FeatureStrategyType/FeatureStrategyType';
import { FeatureStrategyRemove } from '../FeatureStrategyRemove/FeatureStrategyRemove';
import { FeatureStrategyEnabled } from '../FeatureStrategyEnabled/FeatureStrategyEnabled';
import { FeatureStrategyConstraints } from '../FeatureStrategyConstraints/FeatureStrategyConstraints';
import { Button } from '@material-ui/core';
import {
    FeatureStrategyProdGuard,
    useFeatureStrategyProdGuard,
} from '../FeatureStrategyProdGuard/FeatureStrategyProdGuard';
import { IFeatureToggle } from 'interfaces/featureToggle';
import { useStyles } from './FeatureStrategyForm.styles';
import { formatFeaturePath } from '../FeatureStrategyEdit/FeatureStrategyEdit';
import { useHistory } from 'react-router-dom';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import ConditionallyRender from '../../../common/ConditionallyRender';
import { C } from '../../../common/flags';
import { STRATEGY_FORM_SUBMIT_ID } from 'testIds';
import { FeatureStrategyConstraints2 } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/FeatureStrategyConstraints2';
import { useConstraintsValidation } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/useConstraintsValidation';

interface IFeatureStrategyFormProps {
    feature: IFeatureToggle;
    environmentId: string;
    onSubmit: () => void;
    loading: boolean;
    hasAccess: boolean;
    mode: FeatureStrategyFormMode;
    strategy: Partial<IFeatureStrategy>;
    setStrategy: React.Dispatch<
        React.SetStateAction<Partial<IFeatureStrategy>>
    >;
}

export type FeatureStrategyFormMode = 'create' | 'edit';

export const FeatureStrategyForm = ({
    feature,
    strategy,
    setStrategy,
    environmentId,
    onSubmit,
    loading,
    hasAccess,
    mode,
}: IFeatureStrategyFormProps) => {
    const styles = useStyles();
    const [showProdGuard, setShowProdGuard] = useState(false);
    const enableProdGuard = useFeatureStrategyProdGuard(feature, environmentId);
    const StrategyIcon = getFeatureStrategyIcon(strategy.name ?? '');
    const strategyName = getHumanReadableStrategyName(strategy.name ?? '');
    const { uiConfig } = useUiConfig();
    const { push } = useHistory();

    const onCancel = () => {
        push(formatFeaturePath(feature.project, feature.name));
    };

    const onSubmitOrProdGuard = async (event: React.FormEvent) => {
        event.preventDefault();
        if (enableProdGuard) {
            setShowProdGuard(true);
        } else {
            onSubmit();
        }
    };

    const hasValidConstraints = useConstraintsValidation(
        feature.project,
        feature.name,
        strategy.constraints
    );

    // TODO(olav): Remove uiConfig.flags.CO when new constraints are released.
    const FeatureStrategyConstraintsImplementation = uiConfig.flags.CO
        ? FeatureStrategyConstraints2
        : FeatureStrategyConstraints;
    const disableSubmitButtonFromConstraints = uiConfig.flags.CO
        ? !hasValidConstraints
        : false;

    return (
        <form className={styles.form} onSubmit={onSubmitOrProdGuard}>
            <h2 className={styles.title}>
                <StrategyIcon className={styles.icon} aria-hidden />
                <span className={styles.name}>{strategyName}</span>
            </h2>
            <div>
                <FeatureStrategyEnabled
                    feature={feature}
                    environmentId={environmentId}
                />
            </div>
            <ConditionallyRender
                condition={Boolean(uiConfig.flags[C])}
                show={
                    <div>
                        <FeatureStrategyConstraintsImplementation
                            projectId={feature.project}
                            environmentId={environmentId}
                            strategy={strategy}
                            setStrategy={setStrategy}
                            mode={mode}
                        />
                    </div>
                }
            />
            <FeatureStrategyType
                strategy={strategy}
                setStrategy={setStrategy}
                hasAccess={hasAccess}
            />
            <div className={styles.buttons}>
                <Button
                    type="button"
                    color="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <ConditionallyRender
                    condition={Boolean(strategy.id)}
                    show={
                        <FeatureStrategyRemove
                            projectId={feature.project}
                            featureId={feature.name}
                            environmentId={environmentId}
                            strategyId={strategy.id!}
                            disabled={loading}
                        />
                    }
                />
                <FeatureStrategyProdGuard
                    open={showProdGuard}
                    onClose={() => setShowProdGuard(false)}
                    onClick={onSubmit}
                    loading={loading}
                    label="Save strategy"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading || disableSubmitButtonFromConstraints}
                    data-test={STRATEGY_FORM_SUBMIT_ID}
                >
                    Save strategy
                </Button>
            </div>
        </form>
    );
};
