import React, { Component } from 'react';

class ImportState extends Component {
    constructor() {
        super();
        this.state = {
            importFile: undefined,
        };
    }

    onChange = evt => {
        evt.preventDefault();
        this.setState({ importFile: evt.target.files[0] });
    };

    onSubmit = evt => {
        evt.preventDefault();

        if (this.state.importFile) {
            const formData = new FormData();
            formData.append('file', this.state.importFile);

            fetch('api/admin/state/import', {
                method: 'POST',
                body: formData,
            }).catch(() => {
                this.setState({ error: 'error uploading file' });
            });
        }
    };

    render() {
        return (
            <div>
                <h2>Import</h2>
                <form onSubmit={this.onSubmit} method="POST">
                    <input type="file" name="import" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    }
}

export default ImportState;
