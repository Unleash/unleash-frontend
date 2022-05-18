import { useContext, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    DELETE_CONTEXT_FIELD,
    UPDATE_CONTEXT_FIELD,
} from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';

interface IContextActionsCellProps {
    name: string;
    onDelete: () => void;
}

export const ContextActionsCell: VFC<IContextActionsCellProps> = ({
    name,
    onDelete,
}) => {
    const { hasAccess } = useContext(AccessContext);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                px: 2,
                justifyContent: 'flex-end',
            }}
        >
            <ConditionallyRender
                condition={hasAccess(UPDATE_CONTEXT_FIELD)}
                show={
                    <Tooltip title="Edit context field" arrow>
                        <IconButton
                            onClick={() => navigate(`/context/edit/${name}`)}
                            size="large"
                            data-loading
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConditionallyRender
                condition={hasAccess(DELETE_CONTEXT_FIELD)}
                show={
                    <Tooltip title="Delete context field" arrow>
                        <IconButton
                            aria-label="delete"
                            onClick={onDelete}
                            size="large"
                            data-loading
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                }
            />
        </Box>
    );
};
