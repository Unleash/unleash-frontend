import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, unauthorized, ...rest }) => {
    console.log('HELLO', Component);
    return (
        <Route
            {...rest}
            render={props => {
                if (unauthorized) {
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
