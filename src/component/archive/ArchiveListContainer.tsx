import { useFeaturesArchive } from 'hooks/api/getters/useFeaturesArchive/useFeaturesArchive';
import { FeatureToggleList } from '../feature/FeatureToggleList/FeatureToggleArchiveList';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useFeaturesFilter } from 'hooks/useFeaturesFilter';
import useToast from 'hooks/useToast';
import { useFeaturesSort } from 'hooks/useFeaturesSort';
import { openApiAdmin } from 'utils/openapiClient';

export const ArchiveListContainer = () => {
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();

    const {
        archivedFeatures = [],
        refetchArchived,
        loading,
    } = useFeaturesArchive();

    const { filtered, filter, setFilter } = useFeaturesFilter(archivedFeatures);
    const { sorted, sort, setSort } = useFeaturesSort(filtered);

    const onRevive = (featureName: string) => {
        openApiAdmin
            .reviveFeature({ featureName })
            .then(refetchArchived)
            .then(() =>
                setToastData({
                    type: 'success',
                    title: "And we're back!",
                    text: 'The feature toggle has been revived.',
                    confetti: true,
                })
            )
            .catch(e => setToastApiError(e.toString()));
    };

    return (
        <FeatureToggleList
            features={sorted}
            loading={loading}
            onRevive={onRevive}
            flags={uiConfig.flags}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            isArchive
        />
    );
};
