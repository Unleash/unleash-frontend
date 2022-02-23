import { useHistory } from 'react-router-dom';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../hooks/useToast';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import { useStrategyForm } from '../hooks/useStrategyForm';
import { StrategyForm } from '../StrategyForm/StrategyForm';
import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { CREATE_STRATEGY } from '../../providers/AccessProvider/permissions';
import useStrategiesApi from '../../../hooks/api/actions/useStrategiesApi/useStrategiesApi';
import useStrategies from '../../../hooks/api/getters/useStrategies/useStrategies';

export const CreateStrategy = () => {
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const {
        strategyName,
        strategyDesc,
        params,
        setParams,
        setStrategyName,
        setStrategyDesc,
        getStrategyPayload,
        validateStrategyName,
        validateParams,
        clearErrors,
        setErrors,
        errors,
    } = useStrategyForm();
    const { createStrategy, loading } = useStrategiesApi();
    const { refetchStrategies } = useStrategies();

    const handleSubmit = async (e: Event) => {
        clearErrors();
        e.preventDefault();
        const validName = await validateStrategyName();

        if (validName && validateParams()) {
            const payload = getStrategyPayload();
            try {
                await createStrategy(payload);
                refetchStrategies();
                history.push(`/strategies/${strategyName}`);
                setToastData({
                    title: 'Strategy created',
                    text: 'Successfully created strategy',
                    confetti: true,
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/strategies' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getStrategyPayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create strategy type"
            description="The strategy type and the parameters will be selectable when adding an activation strategy to a toggle in the environments. 
            The parameter defines the type of activation strategy. E.g. you can create a type 'Teams' and add a parameter 'List'. Then it's easy to add team names to the activation strategy"
            documentationLink="https://docs.getunleash.io/advanced/custom_activation_strategy"
            formatApiCode={formatApiCode}
        >
            <StrategyForm
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                strategyName={strategyName}
                setStrategyName={setStrategyName}
                strategyDesc={strategyDesc}
                setStrategyDesc={setStrategyDesc}
                params={params}
                setParams={setParams}
                mode="Create"
                setErrors={setErrors}
                clearErrors={clearErrors}
            >
                <PermissionButton permission={CREATE_STRATEGY} type="submit">
                    Create strategy
                </PermissionButton>
            </StrategyForm>
        </FormTemplate>
    );
};
