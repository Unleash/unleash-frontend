import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import classnames from 'classnames';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useStyles } from './FeatureToggleListNew.styles';
import FeatureToggleListNewItem from './FeatureToggleListNewItem/FeatureToggleListNewItem';
import usePagination from '../../../hooks/usePagination';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import loadingFeatures from './FeatureToggleListNewItem/loadingFeatures';
import { IFeatureToggleListItem } from '../../../interfaces/featureToggle';
interface IFeatureToggleListNewProps {
    features: IFeatureToggleListItem[];
    loading: boolean;
    projectId: string;
}

const FeatureToggleListNew = ({
    features,
    loading,
    projectId,
}: IFeatureToggleListNewProps) => {
    const styles = useStyles();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(features, 9);

    const getEnvironments = () => {
        if (features.length > 0) {
            const envs = features[0].environments || [];
            return envs;
        }
        return [
            {
                name: ':global:',
                displayName: 'Across all environments',
                enabled: false,
            },
        ];
    };

    const renderFeatures = () => {
        if (loading) {
            return loadingFeatures.map((feature: IFeatureToggleListItem) => {
                return (
                    <FeatureToggleListNewItem
                        key={feature.name}
                        name={feature.name}
                        type={feature.type}
                        environments={feature.environments}
                        projectId={projectId}
                    />
                );
            });
        }

        return page.map((feature: IFeatureToggleListItem) => {
            return (
                <FeatureToggleListNewItem
                    key={feature.name}
                    name={feature.name}
                    type={feature.type}
                    environments={feature.environments}
                    projectId={projectId}
                />
            );
        });
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className={classnames(
                                styles.tableCell,
                                styles.tableCellName,
                                styles.tableCellHeader
                            )}
                            align="left"
                        >
                            <span data-loading>name</span>
                        </TableCell>
                        <TableCell
                            className={classnames(
                                styles.tableCell,
                                styles.tableCellHeader
                            )}
                            align="left"
                        >
                            <span data-loading>type</span>
                        </TableCell>
                        {getEnvironments().map((env: any) => {
                            return (
                                <TableCell
                                    key={env.name}
                                    className={classnames(
                                        styles.tableCell,
                                        styles.tableCellEnv,
                                        styles.tableCellHeader
                                    )}
                                    align="center"
                                >
                                    <span data-loading>{env.name}</span>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>{renderFeatures()}</TableBody>
            </Table>
            <ConditionallyRender
                condition={pages.length > 1}
                show={
                    <div className={styles.pagination}>
                        <div className={styles.paginationInnerContainer}>
                            <ConditionallyRender
                                condition={pageIndex > 0}
                                show={
                                    <button
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnLeft
                                        )}
                                        onClick={() => prevPage()}
                                    >
                                        <ArrowBackIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                }
                            />
                            {pages.map((page, idx) => {
                                const active = pageIndex === idx;
                                return (
                                    <button
                                        key={idx}
                                        className={classnames(
                                            styles.paginationButton,
                                            {
                                                [styles.paginationButtonActive]:
                                                    active,
                                            }
                                        )}
                                        onClick={() => setPageIndex(idx)}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                            <ConditionallyRender
                                condition={pageIndex < pages.length - 1}
                                show={
                                    <button
                                        onClick={() => nextPage()}
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnRight
                                        )}
                                    >
                                        <ArrowForwardIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                }
                            />
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default FeatureToggleListNew;
