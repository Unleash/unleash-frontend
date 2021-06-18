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

interface IFeatureToggleListNewProps {
    features: any[];
}

const FeatureToggleListNew = ({ features }: IFeatureToggleListNewProps) => {
    const styles = useStyles();
    const getEnvironments = () => {
        if (features.length > 0) {
            const envs = features[0].environments;
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
        return (
            <>
                {features.map((feature: any) => {
                    return (
                        <FeatureToggleListNewItem
                            name={feature.name}
                            type={feature.type}
                            environments={feature.environments}
                        />
                    );
                })}
            </>
        );
    };

    console.log(features);
    return (
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
                        name
                    </TableCell>
                    <TableCell
                        className={classnames(
                            styles.tableCell,
                            styles.tableCellHeader
                        )}
                        align="left"
                    >
                        type
                    </TableCell>
                    {getEnvironments().map((env: any) => {
                        return (
                            <TableCell
                                className={classnames(
                                    styles.tableCell,
                                    styles.tableCellEnv,
                                    styles.tableCellHeader
                                )}
                                align="center"
                            >
                                {env.name}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                <ConditionallyRender
                    condition={features.length > 0}
                    show={renderFeatures()}
                    elseShow={<div>No feature toggles</div>}
                />
            </TableBody>
        </Table>
    );
};

export default FeatureToggleListNew;
