import HeaderTitle from 'component/common/HeaderTitle';
import PageContent from 'component/common/PageContent';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { useHistory } from 'react-router-dom';
import { SegmentsList } from './SegmentList/SegmentList';

export const Segment = () => {
    const history = useHistory();

    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title="Segments"
                    actions={
                        <PermissionButton
                            onClick={() => {
                                history.push('/segments/create');
                            }}
                            permission={ADMIN}
                        >
                            New Segment
                        </PermissionButton>
                    }
                />
            }
        >
            <SegmentsList />
        </PageContent>
    );
};
