import { useStyles } from './RoleListItem.styles';
import { TableRow, TableCell, IconButton, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import AccessContext from '../../../../contexts/AccessContext';
import { useContext } from 'react';
import ConditionallyRender from '../../../common/ConditionallyRender';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

interface RoleListItemProps {
    key: number;
    name: string;
    description: string;
}

function RoleListItem({ key, name, description }: RoleListItemProps) {
    const { hasAccess } = useContext(AccessContext);
    const styles = useStyles();

    return (
        <TableRow key={key} className={styles.tableRow}>
            <TableCell>
                <SupervisedUserCircleIcon />
            </TableCell>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {name}
                </Typography>
            </TableCell>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {description}
                </Typography>
            </TableCell>
            <ConditionallyRender
                condition={hasAccess(ADMIN)}
                show={
                    <TableCell align="right">
                        <IconButton
                            data-loading
                            aria-label="Edit"
                            title="Edit"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            data-loading
                            aria-label="Remove user"
                            title="Remove user"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                }
                elseShow={<TableCell />}
            />
        </TableRow>
    );
}

export default RoleListItem;
