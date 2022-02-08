import SimpleAuth from '../SimpleAuth/SimpleAuth';
import AuthenticationCustomComponent from '../authentication-custom-component';
import PasswordAuth from '../PasswordAuth/PasswordAuth';
import HostedAuth from '../HostedAuth/HostedAuth';
import DemoAuth from '../DemoAuth/DemoAuth';
import {
    SIMPLE_TYPE,
    DEMO_TYPE,
    PASSWORD_TYPE,
    HOSTED_TYPE,
} from '../../../constants/authTypes';
import SecondaryLoginActions from '../common/SecondaryLoginActions/SecondaryLoginActions';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';
import useQueryParams from '../../../hooks/useQueryParams';
import ConditionallyRender from '../../common/ConditionallyRender';
import { Alert } from '@material-ui/lab';

const Authentication = () => {
    const { authDetails } = useAuth().auth ?? {};
    const params = useQueryParams();

    const error = params.get('errorMsg');
    if (!authDetails) return null;

    let content;
    if (authDetails.type === PASSWORD_TYPE) {
        content = (
            <>
                <PasswordAuth
                    authDetails={authDetails}
                />
                <ConditionallyRender
                    condition={!authDetails.defaultHidden}
                    show={<SecondaryLoginActions />}
                />
            </>
        );
    } else if (authDetails.type === SIMPLE_TYPE) {
        content = (
            <SimpleAuth
                authDetails={authDetails}
            />
        );
    } else if (authDetails.type === DEMO_TYPE) {
        content = (
            <DemoAuth
                authDetails={authDetails}
            />
        );
    } else if (authDetails.type === HOSTED_TYPE) {
        content = (
            <>
                <HostedAuth
                    authDetails={authDetails}
                />
                <ConditionallyRender
                    condition={!authDetails.defaultHidden}
                    show={<SecondaryLoginActions />}
                />
            </>
        );
    } else {
        content = <AuthenticationCustomComponent authDetails={authDetails} />;
    }
    return (
        <>
            <div style={{ maxWidth: '350px' }}>
                <ConditionallyRender
                    condition={Boolean(error)}
                    show={<Alert severity="error">{error}</Alert>}
                />
            </div>
            {content}
        </>
    );
};

export default Authentication;
