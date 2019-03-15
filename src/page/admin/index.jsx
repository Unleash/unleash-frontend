import React from 'react';
import ImportState from '../../component/admin/import-state';

const render = () => (
    <div>
        <h2>Admin</h2>
        <h3>Export</h3>
        <a href="api/admin/state/export?download=true" target="_blank">
            Export (feature toggles & strategies)
        </a>

        <ImportState />
    </div>
);

export default render;
