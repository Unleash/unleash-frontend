import React from 'react';
import { Grid, Cell } from 'react-mdl';

export function SubSection(props) {
    return (
        <section style={{ padding: '16px',  marginTop: '25px', border: '1px solid #EFEFEF' }}>
            <h6 style={{ marginTop: '0' }}>{props.title}</h6>
            {props.children}
        </section>
    );
}

export function StepsBar(props) {
    return (
        <Grid style={{textAlign: 'center'}}>
            <Cell col={4}>
                1 <br />
                Define
            </Cell>
            <Cell col={4}>
                2 <br />
                Verify
            </Cell>
            <Cell col={4}>
                3 <br />
                Experiment
            </Cell>
        </Grid>
    );
}