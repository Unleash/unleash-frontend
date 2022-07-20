import { InfoOutlined } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useState, VFC } from 'react';
import { VariantInformation } from './VariantInformation/VariantInformation';
import { IFeatureVariant } from 'interfaces/featureToggle';

interface IVariantCellProps {
    variant: string;
    variants: IFeatureVariant[];
    feature: string;
    isEnabled: boolean;
}

export const VariantCell: VFC<IVariantCellProps> = ({
    variant,
    variants,
    feature,
    isEnabled,
}) => {
    const [anchor, setAnchorEl] = useState(null);

    const onOpen = (event: any) => setAnchorEl(event.currentTarget);

    const onClose = () => setAnchorEl(null);

    const open = Boolean(anchor);
    return (
        <div
            style={{
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'center',
                wordBreak: 'break-all',
            }}
        >
            {variant}
            <ConditionallyRender
                condition={
                    Boolean(variants) && variants.length > 0 && isEnabled
                }
                show={
                    <>
                        <IconButton onClick={onOpen}>
                            <InfoOutlined />
                        </IconButton>

                        <Popover
                            open={open}
                            id={`${feature}-result-variants`}
                            onClose={onClose}
                            anchorEl={anchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: -320,
                            }}
                        >
                            <VariantInformation
                                variants={variants}
                                selectedVariant={variant}
                            />
                        </Popover>
                    </>
                }
            />
        </div>
    );
};
