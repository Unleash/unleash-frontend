import { useContext, VFC } from 'react';
import { styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { Box, IconButton } from '@mui/material';
import { CloudCircle, DragIndicator } from '@mui/icons-material';
import { UPDATE_ENVIRONMENT } from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';

const DragIcon = styled(IconButton)(
    ({ theme }) => `
    padding: ${theme.spacing(0, 1, 0, 2)};
    cursor: inherit;
    color: ${theme.palette.grey[500]};
    transition: color 0.2s ease-in-out;

    [data-dragging=true] & {
        color: ${theme.palette.grey[700]};
    }
`
);

export const EnvironmentIconCell: VFC = () => {
    const { hasAccess } = useContext(AccessContext);
    const updatePermission = hasAccess(UPDATE_ENVIRONMENT);
    const { searchQuery } = useSearchHighlightContext();

    // Allow drag and drop if the user is permitted to reorder environments.
    // Disable drag and drop while searching since some rows may be hidden.
    const enableDragAndDrop = updatePermission && !searchQuery;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ConditionallyRender
                condition={enableDragAndDrop}
                show={
                    <DragIcon size="large" disableRipple>
                        <DragIndicator
                            titleAccess="Drag to reorder"
                            cursor="grab"
                        />
                    </DragIcon>
                }
            />
            <CloudCircle color="disabled" />
        </Box>
    );
};
