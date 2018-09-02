import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-mdl';

class UpdateStrategyComponent extends React.Component {
    static propTypes = {
        featureToggleEdit: PropTypes.object,
        shouldCallInit: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (!this.props.shouldCallInit) {
            this.props.init();
        }
    }

    render() {
        const { featureToggleEdit } = this.props;

        if (!featureToggleEdit) {
            return <div />;
        }

        return (
            <div>
                {featureToggleEdit.strategies.map((s, i) => (
                    <div key={`${s.name}-${i}`}>
                        {s.name} <br />
                        <ul>{s.group ? s.group.map(g => <li key={g.name}>{g.name}</li>) : undefined}</ul>
                    </div>
                ))}
                <br />
                <a href="add" onClick={this.props.addGroup}>
                    + Add strategy group
                </a>
                <br />
                <Link to="/features" onClick={this.props.onCancel}>
                    Cancel Edit
                </Link>
                <Button onClick={this.props.touch}>
                    <Icon name="update" />&nbsp;&nbsp;&nbsp; touch
                </Button>
                <Button type="submit" ripple raised primary disabled={!featureToggleEdit.dirty} icon="add">
                    <Icon name="save" />&nbsp;&nbsp;&nbsp; save
                </Button>
            </div>
        );
    }
}

export default UpdateStrategyComponent;
