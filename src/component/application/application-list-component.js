import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, CircularProgress } from '@material-ui/core';
import { AppsLinkList, styles as commonStyles } from '../common';
import SearchField from '../common/search-field';

const Empty = () => (
    <React.Fragment>
        <section style={{ textAlign: 'center' }}>
            <Icon>warning</Icon> <br />
            <br />
            Oh snap, it does not seem like you have connected any applications. To connect your application to Unleash
            you will require a Client SDK.
            <br />
            <br />
            You can read more about how to use Unleash in your application in the{' '}
            <a href="https://www.unleash-hosted.com/docs/use-feature-toggle">documentation.</a>
        </section>
    </React.Fragment>
);

class ClientStrategies extends Component {
    static propTypes = {
        applications: PropTypes.array,
        fetchAll: PropTypes.func.isRequired,
        settings: PropTypes.object.isRequired,
        updateSetting: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        const { applications } = this.props;

        if (!applications) {
            return <CircularProgress variant="indeterminate" />;
        }
        return (
            <div>
                <div className={commonStyles.toolbar}>
                    <SearchField
                        value={this.props.settings.filter}
                        updateValue={this.props.updateSetting.bind(this, 'filter')}
                    />
                </div>
                <Card shadow={0} className={commonStyles.fullwidth}>
                    {applications.length > 0 ? <AppsLinkList apps={applications} /> : <Empty />}
                </Card>
            </div>
        );
    }
}

export default ClientStrategies;
