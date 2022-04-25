import AdminMenu from '../menu/AdminMenu';
import ConditionallyRender from 'component/common/ConditionallyRender';
import AccessContext from 'contexts/AccessContext';
import { ApiTokenPage } from 'component/admin/apiToken/ApiTokenPage/ApiTokenPage';
import { useContext } from 'react';

const ApiPage = () => {
    const { isAdmin } = useContext(AccessContext);

    return (
        <div>
            <ConditionallyRender condition={isAdmin} show={<AdminMenu />} />
            <ApiTokenPage />
        </div>
    );
};

export default ApiPage;
