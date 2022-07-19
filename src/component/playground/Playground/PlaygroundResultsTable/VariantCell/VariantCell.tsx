import { InfoOutlined, ViewAgenda } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useState, VFC } from 'react';

interface IVariantCellProps {
    variant: string;
    variants: any[];
}

export const VariantCell: VFC<IVariantCellProps> = ({ variant, variants }) => {
    const [anchor, setAnchorEl] = useState(null);

    const onOpen = (event: any) => setAnchorEl(event.currentTarget);

    const onClose = () => setAnchorEl(null);

    const open = Boolean(anchor);
    return (
        <div>
            {variant}
            <ConditionallyRender
                condition={Boolean(variants)}
                show={
                    <>
                        <IconButton onClick={onOpen}>
                            <InfoOutlined />
                        </IconButton>

                        <Popover
                            open={open}
                            id="myid"
                            onClose={onClose}
                            anchorEl={anchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: -120,
                            }}
                        >
                            <p>This is the popover!</p>
                        </Popover>
                    </>
                }
            />
        </div>
    );
};
