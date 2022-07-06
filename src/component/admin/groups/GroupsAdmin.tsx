// import { useContext } from 'react';
import { GroupsList } from './GroupsList/GroupsList';
import AdminMenu from '../menu/AdminMenu';
// import AccessContext from 'contexts/AccessContext';
// import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
// import { ADMIN } from 'component/providers/AccessProvider/permissions';
// import { AdminAlert } from 'component/common/AdminAlert/AdminAlert';

export const GroupsAdmin = () => {
    // const { hasAccess } = useContext(AccessContext);

    return (
        <div>
            <AdminMenu />
            <GroupsList />
            {/* <ConditionallyRender
                condition={hasAccess(ADMIN)}
                show={<span>Groups here!</span>}
                elseShow={<AdminAlert />}
            /> */}
        </div>
    );
};
