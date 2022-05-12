import { useState, VFC } from 'react';
import {
    Box,
    Checkbox,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Tooltip,
    Typography,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloseIcon from '@mui/icons-material/Close';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { capitalize } from 'lodash';
import { useStyles } from './ColumnsMenu.styles';

interface IColumnsMenuProps {
    allColumns: Record<string, any>;
    disabledColumns?: string[];
    dividerBefore?: string[];
    dividerAfter?: string[];
}

export const ColumnsMenu: VFC<IColumnsMenuProps> = ({
    allColumns,
    disabledColumns = [],
    dividerBefore = [],
    dividerAfter = [],
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { classes } = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);
    const id = `columns-menu`;
    const menuId = `columns-menu-list-${id}`;

    return (
        <Box className={classes.container}>
            <Tooltip title="Select columns" arrow describeChild>
                <IconButton
                    id={id}
                    aria-controls={isOpen ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : undefined}
                    onClick={handleClick}
                    type="button"
                    className={classes.button}
                >
                    <ViewColumnIcon />
                </IconButton>
            </Tooltip>

            <Popover
                id={menuId}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock={true}
                PaperProps={{
                    className: classes.menuContainer,
                }}
            >
                <Box className={classes.menuHeader}>
                    <Typography variant="body2">
                        <strong>Columns</strong>
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <MenuList>
                    {allColumns.map(
                        (column: {
                            Header: string | any;
                            id: string;
                            isVisible: boolean;
                            toggleHidden: (state: boolean) => void;
                        }) => [
                            <ConditionallyRender
                                condition={dividerBefore.includes(column.id)}
                                show={<Divider className={classes.divider} />}
                            />,
                            <MenuItem
                                onClick={() => {
                                    column.toggleHidden(column.isVisible);
                                }}
                                disabled={disabledColumns.includes(column.id)}
                                className={classes.menuItem}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={column.isVisible}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': column.id,
                                        }}
                                        size="medium"
                                        className={classes.checkbox}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={column.id}
                                    primary={
                                        <Typography variant="body2">
                                            <ConditionallyRender
                                                condition={
                                                    typeof column.Header ===
                                                    'string'
                                                }
                                                show={() => (
                                                    <>{column.Header}</>
                                                )}
                                                elseShow={() =>
                                                    capitalize(column.id)
                                                }
                                            />
                                        </Typography>
                                    }
                                />
                            </MenuItem>,
                            <ConditionallyRender
                                condition={dividerAfter.includes(column.id)}
                                show={<Divider className={classes.divider} />}
                            />,
                        ]
                    )}
                </MenuList>
            </Popover>
        </Box>
    );
};
