import AdminMenu from '../menu/AdminMenu';
import { BillingGrid } from './BillingGrid/BillingGrid';
import { PageContent } from 'component/common/PageContent/PageContent';
import { useContext } from 'react';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import AccessContext from 'contexts/AccessContext';
import { AdminAlert } from 'component/common/AdminAlert/AdminAlert';
import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import { Alert } from '@mui/material';

export const Billing = () => {
    const { isBilling } = useInstanceStatus();
    const { hasAccess } = useContext(AccessContext);

    return (
        <div>
            <AdminMenu />
            <PageContent header="Billing">
                <ConditionallyRender
                    condition={isBilling}
                    show={
                        <ConditionallyRender
                            condition={hasAccess(ADMIN)}
                            show={() => <BillingGrid />}
                            elseShow={() => <AdminAlert />}
                        />
                    }
                    elseShow={
                        <Alert severity="error">
                            Billing is not enabled for this instance.
                        </Alert>
                    }
                />
            </PageContent>
        </div>
    );
};
