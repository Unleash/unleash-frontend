import { Dispatch, SetStateAction, useContext, VFC } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IFlags } from 'interfaces/uiConfig';
import { SearchField } from 'component/common/SearchField/SearchField';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import AccessContext from 'contexts/AccessContext';
import { IFeaturesFilter } from 'hooks/useFeaturesFilter';
import { FeatureToggleListItem } from './FeatureToggleListItem/FeatureToggleListItem';
import { FeatureToggleListActions } from './FeatureToggleListActions/FeatureToggleListActions';
import { CreateFeatureButton } from '../CreateFeatureButton/CreateFeatureButton';
import { IFeaturesSort } from 'hooks/useFeaturesSort';
import { FeatureSchema } from 'openapi';
import { useStyles } from './styles';

interface IFeatureToggleListProps {
    features: FeatureSchema[];
    loading?: boolean;
    flags?: IFlags;
    filter: IFeaturesFilter;
    setFilter: Dispatch<SetStateAction<IFeaturesFilter>>;
    sort: IFeaturesSort;
    setSort: Dispatch<SetStateAction<IFeaturesSort>>;
    onRevive?: (feature: string) => void;
    inProject?: boolean;
    isArchive?: boolean;
}

const loadingFeaturesPlaceholder: FeatureSchema[] = Array(10)
    .fill({
        createdAt: '2021-03-19T09:16:21.329Z',
        description: ' ',
        enabled: true,
        lastSeenAt: '2021-03-24T10:46:38.036Z',
        name: '',
        project: 'default',
        stale: true,
        strategies: [],
        variants: [],
        type: 'release',
        archived: false,
        environments: [],
        impressionData: false,
    })
    .map((feature, index) => ({ ...feature, name: `${index}` })); // ID for React key

export const FeatureToggleList: VFC<IFeatureToggleListProps> = ({
    features,
    onRevive,
    inProject,
    isArchive,
    loading,
    flags,
    filter,
    setFilter,
    sort,
    setSort,
}) => {
    const { hasAccess } = useContext(AccessContext);
    const { classes: styles } = useStyles();
    const smallScreen = useMediaQuery('(max-width:800px)');
    const mobileView = useMediaQuery('(max-width:600px)');

    const setFilterQuery = (v: string) => {
        const query = v && typeof v === 'string' ? v.trim() : '';
        setFilter(prev => ({ ...prev, query }));
    };

    const renderFeatures = () => {
        if (loading) {
            return loadingFeaturesPlaceholder.map(feature => (
                <FeatureToggleListItem
                    key={feature.name}
                    feature={feature}
                    onRevive={onRevive}
                    hasAccess={hasAccess}
                    className={'skeleton'}
                    flags={flags}
                />
            ));
        }

        return (
            <ConditionallyRender
                condition={features.length > 0}
                show={features.map(feature => (
                    <FeatureToggleListItem
                        key={feature.name}
                        feature={feature}
                        onRevive={onRevive}
                        hasAccess={hasAccess}
                        flags={flags}
                        inProject={inProject}
                    />
                ))}
                elseShow={
                    <ListItem className={styles.emptyStateListItem}>
                        No archived features.
                    </ListItem>
                }
            />
        );
    };

    const searchResultsHeader = filter.query
        ? ` (${features.length} matches)`
        : '';

    const headerTitle = isArchive
        ? inProject
            ? `Archived project features ${searchResultsHeader}`
            : `Archived features ${searchResultsHeader}`
        : `Features ${searchResultsHeader}`;

    return (
        <div>
            <div
                className={classnames(styles.searchBarContainer, {
                    dense: inProject,
                })}
            >
                <SearchField
                    initialValue={filter.query}
                    updateValue={setFilterQuery}
                    showValueChip={!mobileView}
                    className={classnames(styles.searchBar, {
                        skeleton: loading,
                    })}
                />
                <ConditionallyRender
                    condition={!mobileView && !isArchive}
                    show={<Link to="/archive">Archive</Link>}
                />
            </div>

            <PageContent
                header={
                    <PageHeader
                        loading={loading}
                        title={headerTitle}
                        actions={
                            <div className={styles.actionsContainer}>
                                <ConditionallyRender
                                    condition={!smallScreen}
                                    show={
                                        <FeatureToggleListActions
                                            filter={filter}
                                            setFilter={setFilter}
                                            sort={sort}
                                            setSort={setSort}
                                            loading={loading}
                                            inProject={inProject}
                                        />
                                    }
                                />
                                <ConditionallyRender
                                    condition={!isArchive}
                                    show={
                                        <CreateFeatureButton
                                            filter={filter}
                                            loading={Boolean(loading)}
                                        />
                                    }
                                />
                            </div>
                        }
                    />
                }
            >
                <List>{renderFeatures()}</List>
            </PageContent>
        </div>
    );
};
