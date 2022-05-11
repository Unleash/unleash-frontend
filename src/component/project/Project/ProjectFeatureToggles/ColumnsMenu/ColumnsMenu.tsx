import { Fragment, ReactNode, useState, VFC } from 'react';
import {
    Checkbox,
    Divider,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { capitalize } from 'lodash';

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
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const id = `columns-menu`;
    const menuId = `columns-menu-list-${id}`;

    return (
        <div>
            <Tooltip title="Select columns" arrow describeChild>
                <IconButton
                    id={id}
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    type="button"
                >
                    <ViewColumnIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': id,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock={true}
            >
                {allColumns.map(
                    (column: {
                        Header: string | any;
                        id: string;
                        isVisible: boolean;
                        toggleHidden: (state: boolean) => void;
                    }) => [
                        <ConditionallyRender
                            condition={dividerBefore.includes(column.id)}
                            show={<Divider />}
                        />,
                        <MenuItem
                            onClick={() => {
                                column.toggleHidden(column.isVisible);
                            }}
                            disabled={disabledColumns.includes(column.id)}
                            dense
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
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={column.id}
                                primary={
                                    <ConditionallyRender
                                        condition={
                                            typeof column.Header === 'string'
                                        }
                                        show={() => <>{column.Header}</>}
                                        elseShow={() => capitalize(column.id)}
                                    />
                                }
                            />
                        </MenuItem>,
                        <ConditionallyRender
                            condition={dividerAfter.includes(column.id)}
                            show={<Divider />}
                        />,
                    ]
                )}
            </Menu>
        </div>
    );
};
