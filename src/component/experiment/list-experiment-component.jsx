import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemAction, ListItemContent, Icon, IconButton, Card } from 'react-mdl';
import { HeaderTitle, styles as commonStyles } from '../common';
import { CREATE_FEATURE } from '../../permissions';

class CreateExperimentComponent extends Component {
    static propTypes = {
        experiments: PropTypes.array.isRequired,
        fetchStrategies: PropTypes.func.isRequired,
        removeStrategy: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetch();
    }

    removeContextField = (contextField, evt) => {
        evt.preventDefault();
        this.props.removeContextField(contextField);
    };

    render() {
        const { experiments, hasPermission } = this.props;

        return (
            <Card shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                <HeaderTitle
                    title="Experiments"
                    actions={
                        hasPermission(CREATE_FEATURE) ? (
                            <IconButton
                                raised
                                name="add"
                                onClick={() => this.props.history.push('/experiments/create')}
                                title="Create a new experiment"
                            />
                        ) : (
                            ''
                        )
                    }
                />
                <List>
                    {experiments.length > 0 ? (
                        experiments.map((exp, i) => (
                            <ListItem key={i} twoLine>
                                <ListItemContent subtitle={exp.desription}>
                                    <Link to={`/context/view/${exp.name}`}>
                                        <strong>{exp.name}</strong>
                                    </Link>
                                </ListItemContent>
                                <ListItemAction>
                                    <a
                                        href="#delete"
                                        title="Remove contextField"
                                        onClick={this.removeContextField.bind(this, exp)}
                                    >
                                        <Icon name="delete" />
                                    </a>
                                </ListItemAction>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>Opps, no experiments defined</ListItem>
                    )}
                </List>
            </Card>
        );
    }
}

export default CreateExperimentComponent;
