import { Chip } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IOverride, IPayload } from 'interfaces/featureToggle';

interface IPayloadOverridesCellProps {
    payload: IPayload;
    overrides: IOverride[];
}

export const PayloadOverridesCell = ({
    payload,
    overrides,
}: IPayloadOverridesCellProps) => {
    return (
        <>
            <ConditionallyRender
                condition={Boolean(payload)}
                show={<Chip label="Payload" />}
            />
            <ConditionallyRender
                condition={overrides && overrides.length > 0}
                show={
                    <Chip
                        style={{
                            backgroundColor: 'rgba(173, 216, 230, 0.2)',
                        }}
                        label="Overrides"
                    />
                }
            />
        </>
    );
};
