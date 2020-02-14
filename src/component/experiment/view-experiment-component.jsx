import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Textfield, List, ListItem, ListItemContent, ListItemAction, Card, CardTitle, CardText, CardActions, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import { SubSection, StepsBar } from './parts';

import { FormButtons } from '../common';
import { trim, updateWeight } from '../common/util';

import StrategyInputPercentage from '../feature/form/strategy-input-percentage';

import { styles as commonStyles } from '../common';
import styles from './styles.scss';


function getExpInfo(experiment) {
    if(!experiment || !experiment.variants || !experiment.variants[0] || !experiment.variants[0].payload) {
        return {status: 'initial'};
    }
    const payload = experiment.variants[0].payload;
    return JSON.parse(payload.value)
}

class ViewExperimentComponent extends Component {
    static propTypes = {
        experiment: PropTypes.objectm,
    };

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.fetch();
    }

    removeVariant = () => {

    }

    render() {
        const { experiment, experimentName } = this.props;
        const expInfo = getExpInfo(experiment);
        if(!experiment) return <span>loading....</span>;

        return (
            <div>
                <StepsBar />
                <Card shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                    <CardTitle style={{ paddingTop: '24px', paddingBottom: '0', wordBreak: 'break-all' }}>
                        {experimentName}
                    </CardTitle>
                    <CardText>
                        experiment status: {expInfo.status}
                    </CardText>
                    <section style={{ padding: '16px' }}>
                        <SubSection title="Variants">
                            <p style={{ color: 'rgba(0,0,0,.54)' }}>
                                What do you want to test?
                            </p>
                            <List>
                                {experiment.variants.map((v, i) => (
                                        <ListItem key={i}>
                                            <ListItemContent>
                                                {v.name}
                                            </ListItemContent>
                                            <span className={styles.listItemWeight}>
                                                {v.weight/10.0}%
                                            </span>
                                            <ListItemAction>
                                                <a
                                                    href="#delete"
                                                    title="Remove variant"
                                                    onClick={this.removeVariant.bind(this, v.name)}
                                                >
                                                    <Icon name="delete" />
                                                </a>
                                            </ListItemAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <Button onClick={this.showAddVariant} icon="add"><Icon name="add"></Icon> Add variant</Button>
                        </SubSection>
                        <div style={{ textAlign: 'center', margin: '50px' }}>
                            <Button raised accent large>Start experiment</Button>
                        </div>
                    </section>
                </Card>
            </div>
        );
    }
}

export default ViewExperimentComponent;
