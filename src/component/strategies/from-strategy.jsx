import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Textfield, IconButton, Menu, MenuItem, Checkbox, CardTitle, Card, CardActions } from 'react-mdl';
import { styles as commonStyles, FormButtons } from '../common';
import { trim } from '../common/util';

function gerArrayWithEntries(num) {
    return Array.from(Array(num));
}

const Parameter = ({ set, input = {}, index }) => (
    <div style={{ background: '#f1f1f1', padding: '16px 20px', marginBottom: '20px' }}>
        <Textfield
            style={{ width: '50%' }}
            floatingLabel
            label={`Parameter name ${index + 1}`}
            onChange={({ target }) => set({ name: target.value }, true)}
            value={input.name}
        />
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span
                className="mdl-outline"
                id={`${index}-type-menu`}
                style={{
                    borderRadius: '2px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 2px 0 rgba(0,0,0,.04),0 3px 1px -2px rgba(0,0,0,.1),0 1px 5px 0 rgba(0,0,0,.12)',
                    marginLeft: '10px',
                    border: '1px solid #f1f1f1',
                    backgroundColor: 'white',
                    padding: '10px 2px 10px 20px',
                }}
            >
                {input.type || 'string'}
                <IconButton name="arrow_drop_down" onClick={evt => evt.preventDefault()} />
            </span>
            <Menu target={`${index}-type-menu`} align="right">
                <MenuItem onClick={() => set({ type: 'string' })}>string</MenuItem>
                <MenuItem onClick={() => set({ type: 'percentage' })}>percentage</MenuItem>
                <MenuItem onClick={() => set({ type: 'list' })}>list</MenuItem>
                <MenuItem onClick={() => set({ type: 'number' })}>number</MenuItem>
                <MenuItem onClick={() => set({ type: 'boolean' })}>boolean</MenuItem>
            </Menu>
        </div>
        <Textfield
            floatingLabel
            style={{ width: '100%' }}
            rows={2}
            label={`Parameter name ${index + 1} description`}
            onChange={({ target }) => set({ description: target.value })}
            value={input.description}
        />
        <Checkbox
            label="Required"
            checked={!!input.required}
            onChange={() => set({ required: !input.required })}
            ripple
        />
    </div>
);
Parameter.propTypes = {
    input: PropTypes.object,
    set: PropTypes.func,
    index: PropTypes.number,
};

const EditHeader = () => (
    <div>
        <h4 style={{ marginTop: '16px' }}>Edit strategy</h4>
        <p style={{ background: '#ffb7b7', padding: '16px 20px' }}>
            Be carefull! Changing a strategy definition might also require changes to the implementation in the clients.
        </p>
    </div>
);

const CreateHeader = () => (
    <div>
        <h4 style={{ marginTop: '16px' }}>Create a new Strategy definition</h4>
    </div>
);

const Parameters = ({ input = [], count = 0, updateParameter }) => (
    <div>
        {gerArrayWithEntries(count).map((v, i) => (
            <Parameter key={i} set={v => updateParameter(i, v, true)} index={i} input={input[i]} />
        ))}
    </div>
);

Parameters.propTypes = {
    input: PropTypes.array,
    updateParameter: PropTypes.func.isRequired,
    count: PropTypes.number,
};

class AddStrategy extends Component {
    static propTypes = {
        input: PropTypes.object,
        setValue: PropTypes.func,
        appParameter: PropTypes.func,
        updateParameter: PropTypes.func,
        clear: PropTypes.func,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func,
        editMode: PropTypes.bool,
    };

    render() {
        const { input, setValue, appParameter, onCancel, editMode = false, onSubmit, updateParameter } = this.props;

        return (
            <Card shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible', paddingBottom: '10px' }}>
                <CardTitle style={{ paddingTop: '24px', wordBreak: 'break-all' }}>
                    {editMode ? <EditHeader /> : <CreateHeader />}
                </CardTitle>
                <form onSubmit={onSubmit}>
                    <section style={{ padding: '16px' }}>
                        <Textfield
                            label="Strategy name"
                            floatingLabel
                            name="name"
                            placeholder=""
                            disabled={editMode}
                            onChange={({ target }) => setValue('name', trim(target.value))}
                            value={input.name}
                        />
                        <br />
                        <Textfield
                            floatingLabel
                            style={{ width: '100%' }}
                            rows={1}
                            label="Description"
                            name="description"
                            placeholder=""
                            onChange={({ target }) => setValue('description', target.value)}
                            value={input.description}
                        />
                        <Parameters
                            input={input.parameters}
                            count={input.parameters.length}
                            updateParameter={updateParameter}
                        />
                        <IconButton
                            raised
                            name="add"
                            title="Add parameter"
                            onClick={e => {
                                e.preventDefault();
                                appParameter();
                            }}
                        />{' '}
                        &nbsp;Add parameter
                    </section>
                    <CardActions>
                        <FormButtons submitText={editMode ? 'Update' : 'Create'} onCancel={onCancel} />
                    </CardActions>
                </form>
            </Card>
        );
    }
}

export default AddStrategy;
