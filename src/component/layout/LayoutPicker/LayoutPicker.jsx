import ConditionallyRender from '../../common/ConditionallyRender';
import MainLayout from '../MainLayout/MainLayout';

const LayoutPicker = ({ children, location }) => {
    const standalonePages = () => {
        const isLoginPage = location.pathname.includes('login');
        const isNewUserPage = location.pathname.includes('new-user');
        const isChangePasswordPage = location.pathname.includes(
            'reset-password'
        );

        return isLoginPage || isNewUserPage || isChangePasswordPage;
    };

    return (
        <ConditionallyRender
            condition={standalonePages()}
            show={children}
            elseShow={<MainLayout location={location}>{children}</MainLayout>}
        />
    );
};

export default LayoutPicker;
