import React , { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UserFeatureListContainer from '../../component/user-feature/user-feature-list-container';

// const render = () => <UserFeatureListContainer />;

// export default render;


export default class UserFeatures extends PureComponent {
    static propTypes = {
        params: PropTypes.object.isRequired,
    };

    render() {
        const { params } = this.props;
        return <UserFeatureListContainer  userId={params.userId}/>;
    }
}
