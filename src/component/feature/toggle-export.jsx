import Modal from 'react-modal';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, IconButton } from 'react-mdl';

// Move out as util
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 99999,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        padding: 0,
        overflow: 'none',
    },
};

export default class ExportToggleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    static propTypes = {
        featureToggle: PropTypes.object,
    };

    openDialog = e => {
        e.preventDefault();
        this.setState({ open: true });
    };

    closeDialog = e => {
        e.preventDefault();
        this.setState({ open: false });
    };

    render() {
        const { featureToggle } = this.props;

        return (
            <div>
                <IconButton
                    style={{ color: 'gray' }}
                    name="import_export"
                    id="export-toggle"
                    title="Export toggle"
                    onClick={this.openDialog}
                />
                <Modal isOpen={this.state.open} contentLabel="Export toggle" style={customStyles}>
                    <div style={{ backgroundColor: 'white', margin: 0, padding: '5px', minWidth: '400px' }}>
                        <h3>
                            <Icon name="import_export" large />
                            {featureToggle.name}
                        </h3>
                        <textarea
                            rows="20"
                            style={{
                                minWidth: '500px',
                                minHight: '500px',
                                border: '1px solid silver',
                            }}
                        >
                            {JSON.stringify(featureToggle, null, 2)}
                        </textarea>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button name="close" title="close" onClick={this.closeDialog}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
