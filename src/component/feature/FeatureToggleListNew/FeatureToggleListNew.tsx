import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './FeatureToggleListNew.styles';
import FeatureToggleListNewItem from './FeatureToggleListNewItem/FeatureToggleListNewItem';

const FeatureToggleListNew = () => {
    const styles = useStyles();
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
                    <TableCell
                        className={classnames(
                            styles.tableCell,
                            styles.tableCellEnv,
                            styles.tableCellHeader
                        )}
                        align="center"
                    >
                        dev
                    </TableCell>
                    <TableCell
                        className={classnames(
                            styles.tableCell,
                            styles.tableCellEnv,
                            styles.tableCellHeader
                        )}
                        align="center"
                    >
                        prod
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <FeatureToggleListNewItem name="my-toggle" type="release" />
                <FeatureToggleListNewItem name="Fredrik" type="experiment" />
            </TableBody>
        </Table>
    );
};

export default FeatureToggleListNew;
