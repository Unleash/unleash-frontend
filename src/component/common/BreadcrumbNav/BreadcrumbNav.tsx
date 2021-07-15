import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import ConditionallyRender from '../ConditionallyRender';

const BreadcrumbNav = () => {
    const location = useLocation();

    const paths = location.pathname
        .split('/')
        .filter(item => item)
        .filter(
            item => item !== 'create' && item !== 'edit' && item !== 'access'
        );

    return (
        <ConditionallyRender
            condition={paths.length > 1}
            show={
                <Breadcrumbs style={{ marginBottom: '1rem' }}>
                    {paths.map((path, index) => {
                        const lastItem = index === paths.length - 1;
                        if (lastItem) {
                            return (
                                <p
                                    style={{
                                        textTransform: 'capitalize',
                                        color: 'inherit',
                                    }}
                                >
                                    {path}
                                </p>
                            );
                        }
                        return (
                            <Link
                                style={{
                                    textTransform: 'capitalize',
                                    textDecoration: 'none',
                                }}
                                to={`/${path}`}
                            >
                                {path}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            }
        />
    );
};

export default BreadcrumbNav;
