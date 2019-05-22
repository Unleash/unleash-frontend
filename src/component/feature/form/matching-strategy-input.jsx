import React, { Component } from 'react';
import { Grid, Cell, Menu, MenuItem, Textfield } from 'react-mdl';

import StrategyInputPercentage from './strategy-input-percentage';

const contextNames = ['userId', 'environment'];

export default class MatchingStrategyInput extends Component {
    render() {
        return (
            <div>
                <div style={{ margin: '0 25px' }}>
                    <h6>Constraints</h6>
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded"
                        style={{ width: '120px' }}
                    >
                        <select className="mdl-textfield__input" name="conextName">
                            <option value="environment">environment</option>
                            <option value="userId">userId</option>
                            <option value="application">application</option>
                        </select>
                        <label className="mdl-textfield__label" htmlFor="textfield-conextName">
                            Context Field
                        </label>
                    </div>
                    &nbsp;
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded"
                        style={{ width: '85px' }}
                    >
                        <select className="mdl-textfield__input" name="operator">
                            <option value="IN">IN</option>
                            <option value="NOT_IN">NOT IN</option>
                        </select>
                        <label className="mdl-textfield__label" htmlFor="textfield-operator">
                            Operator
                        </label>
                    </div>
                    &nbsp;
                    <Textfield
                        floatingLabel
                        onChange={() => {}}
                        label="Values (v1, v2, v3)"
                        style={{ width: '600px' }}
                    />
                    <br />
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded"
                        style={{ width: '120px' }}
                    >
                        <select className="mdl-textfield__input" name="conextName">
                            <option value="environment">environment</option>
                            <option value="userId">userId</option>
                            <option value="application">application</option>
                        </select>
                        <label className="mdl-textfield__label" htmlFor="textfield-conextName">
                            Context Field
                        </label>
                    </div>
                    &nbsp;
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded"
                        style={{ width: '85px' }}
                    >
                        <select className="mdl-textfield__input" name="operator">
                            <option value="IN">IN</option>
                            <option value="NOT_IN">NOT IN</option>
                        </select>
                        <label className="mdl-textfield__label" htmlFor="textfield-operator">
                            Operator
                        </label>
                    </div>
                    &nbsp;
                    <Textfield
                        floatingLabel
                        onChange={() => {}}
                        label="Values (v1, v2, v3)"
                        style={{ width: '600px' }}
                    />
                    <br />
                    <a href="#add">+ Add constraint</a>
                </div>
                <br />
                <br />
                <br />
                <StrategyInputPercentage name="Rollout" value={100} />
                <div style={{ margin: '0 25px' }}>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded">
                        <select className="mdl-textfield__input" name="stickiness">
                            <option value="default">default</option>
                            <option value="userId">userId</option>
                            <option value="sessionId">sessionId</option>
                            <option value="random">random</option>
                        </select>
                        <label className="mdl-textfield__label" htmlFor="textfield-stickiness">
                            Stickiness
                        </label>
                    </div>
                    <Textfield floatingLabel onChange={() => {}} label="groupId" value="Demo" />{' '}
                </div>
            </div>
        );
    }
}
