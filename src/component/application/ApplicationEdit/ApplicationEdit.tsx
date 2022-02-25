/* eslint react/no-multi-comp:off */
import { useContext, useState } from 'react';
import {
    Avatar,
    Icon,
    IconButton,
    LinearProgress,
    Link,
    Typography,
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import { UPDATE_APPLICATION } from '../../providers/AccessProvider/permissions';
import { ApplicationView } from '../ApplicationView/ApplicationView';
import { ApplicationUpdate } from '../ApplicationUpdate/ApplicationUpdate';
import TabNav from '../../common/TabNav/TabNav';
import Dialogue from '../../common/Dialogue';
import PageContent from '../../common/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import AccessContext from '../../../contexts/AccessContext';
import useApplicationsApi from '../../../hooks/api/actions/useApplicationsApi/useApplicationsApi';
import useApplication from '../../../hooks/api/getters/useApplication/useApplication';
import { useHistory, useParams } from 'react-router-dom';
import { useLocationSettings } from '../../../hooks/useLocationSettings';
import useToast from '../../../hooks/useToast';
import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { formatDateYMD } from '../../../utils/format-date';
import { formatUnknownError } from '../../../utils/format-unknown-error';

export const ApplicationEdit = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();
    const { application, loading } = useApplication(name);
    const { appName, url, description, icon = 'apps', createdAt } = application;
    const { hasAccess } = useContext(AccessContext);
    const { deleteApplication } = useApplicationsApi();
    const { locationSettings } = useLocationSettings();
    const { setToastData, setToastApiError } = useToast();

    const [showDialog, setShowDialog] = useState(false);

    const toggleModal = () => {
        setShowDialog(!showDialog);
    };

    const formatDate = (v: string) => formatDateYMD(v, locationSettings.locale);

    const onDeleteApplication = async (evt: Event) => {
        evt.preventDefault();
        try {
            await deleteApplication(appName);
            setToastData({
                title: 'Deleted Successfully',
                text: 'Application deleted successfully',
                type: 'success',
            });
            history.push('/applications');
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    const renderModal = () => (
        <Dialogue
            open={showDialog}
            onClose={toggleModal}
            onClick={onDeleteApplication}
            title="Are you sure you want to delete this application?"
        />
    );
    const tabData = [
        {
            label: 'Application overview',
            component: <ApplicationView />,
        },
        {
            label: 'Edit application',
            component: <ApplicationUpdate application={application} />,
        },
    ];

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <LinearProgress />
            </div>
        );
    } else if (!application) {
        return <p>Application ({appName}) not found</p>;
    }
    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title={
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar style={{ marginRight: '8px' }}>
                                <Icon>{icon || 'apps'}</Icon>
                            </Avatar>
                            {appName}
                        </span>
                    }
                    actions={
                        <>
                            <ConditionallyRender
                                condition={Boolean(url)}
                                show={
                                    <IconButton component={Link} href={url}>
                                        <LinkIcon />
                                    </IconButton>
                                }
                            />

                            <PermissionButton
                                title="Delete application"
                                onClick={toggleModal}
                                permission={UPDATE_APPLICATION}
                            >
                                Delete
                            </PermissionButton>
                        </>
                    }
                />
            }
        >
            <div>
                <Typography variant="body1">{description || ''}</Typography>
                <Typography variant="body2">
                    Created: <strong>{formatDate(createdAt)}</strong>
                </Typography>
            </div>
            <ConditionallyRender
                condition={hasAccess(UPDATE_APPLICATION)}
                show={
                    <div>
                        {renderModal()}
                        <TabNav tabData={tabData} />
                    </div>
                }
            />
        </PageContent>
    );
};
