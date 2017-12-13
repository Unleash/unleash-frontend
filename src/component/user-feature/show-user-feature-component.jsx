import React, { Component } from 'react';
import { Textfield, Button, Grid, Cell, Card, CardTitle } from 'react-mdl';
import Link from 'react-router/es/Link';
import { styles as commonStyles } from '../common';

export default class ShowUserFeatureComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            goToRoute: false,
        };
    }

    updateUsername = event => {
        this.state.username = event.target.value;
    }

    render() {
        const test = 'hau';

        return (
            <div>
                <Card
                    shadow={0}
                    className={commonStyles.fullwidth}
                    style={{ display: 'block', padding: '50px', margin: 'auto', overflow: 'visible' }}
                >
                    <CardTitle> Enter the user ID </CardTitle>
                    <Textfield
                        style={{ margin: '17px', width: '30%' }}
                        onChange={this.updateUsername}
                        pattern="-?([a-zA-Z0-9]||[^-\s])+"
                        error="Input is not a valid username!"
                        label="User ID"
                        floatingLabel
                    />
                    <Link to={`/user-features/${test}`} style={{ padding: '10px', width: '10%' }}>
                        <Button raised> GO </Button>
                    </Link>
                </Card>
            </div>
        );
    }
}
