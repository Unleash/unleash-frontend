import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import AccessContext from 'contexts/AccessContext';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    CREATE_API_TOKEN,
    READ_API_TOKEN,
} from 'component/providers/AccessProvider/permissions';
import { CREATE_API_TOKEN_BUTTON } from 'utils/testIds';
import { ApiTokenList } from 'component/admin/apiToken/ApiTokenList/ApiTokenList';
import { AdminAlert } from 'component/common/AdminAlert/AdminAlert';
import { ApiTokenDocs } from 'component/admin/apiToken/ApiTokenDocs/ApiTokenDocs';

export const ApiTokenPage = () => {
    const { hasAccess } = useContext(AccessContext);
    const navigate = useNavigate();

    return (
        <PageContent
            header={
                <PageHeader
                    title="API Access"
                    actions={
                        <ConditionallyRender
                            condition={hasAccess(CREATE_API_TOKEN)}
                            show={
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        navigate('/admin/api/create-token')
                                    }
                                    data-testid={CREATE_API_TOKEN_BUTTON}
                                >
                                    New API token
                                </Button>
                            }
                        />
                    }
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
