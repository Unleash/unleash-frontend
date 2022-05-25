import { useContext } from 'react';
import { Box } from '@mui/material';
import AccessContext from 'contexts/AccessContext';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { READ_API_TOKEN } from 'component/providers/AccessProvider/permissions';
import { ApiTokenList } from 'component/admin/apiToken/ApiTokenList/ApiTokenList';
import { AdminAlert } from 'component/common/AdminAlert/AdminAlert';
import { ApiTokenDocs } from 'component/admin/apiToken/ApiTokenDocs/ApiTokenDocs';
import { CreateApiTokenButton } from 'component/admin/apiToken/CreateApiTokenButton/CreateApiTokenButton';

export const ApiTokenPage = () => {
    const { hasAccess } = useContext(AccessContext);

    return (
        <PageContent
            header={
                <PageHeader
                    title="API Access"
                    actions={<CreateApiTokenButton />}
                />
            }
        >
            <Box sx={{ mb: 4 }}>
                <ApiTokenDocs />
            </Box>
            <ConditionallyRender
                condition={hasAccess(READ_API_TOKEN)}
                show={() => <ApiTokenList />}
                elseShow={() => <AdminAlert />}
            />
        </PageContent>
    );
};
