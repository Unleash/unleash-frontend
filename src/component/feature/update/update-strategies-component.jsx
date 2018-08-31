import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-mdl';

class UpdateStrategyComponent extends React.Component {
    static propTypes = {
        featureToggleEdit: PropTypes.object,
        onCancel: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (!this.props.featureToggleEdit) {
            this.props.initEditStore();
        }
    }

    render() {
        const { featureToggleEdit } = this.props;
        console.log(featureToggleEdit);

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
                <Link to="/features" onClick={this.props.onCancel}>
                    Cancel Edit
                </Link>
                <Button onClick={this.props.touch}>
                    <Icon name="update" />&nbsp;&nbsp;&nbsp; touch
                </Button>
                <Button type="submit" ripple raised primary disabled={!featureToggleEdit.dirty} icon="add">
                    <Icon name="add" />&nbsp;&nbsp;&nbsp; Update toggle
                </Button>
            </div>
        );
    }
}

export default UpdateStrategyComponent;
