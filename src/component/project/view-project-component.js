import { Typography } from '@material-ui/core';
import React from 'react';
import PageContent from '../common/PageContent';


const ViewProjectComponent = ({project}) => {

    return (
        <div>
            <a href="edit">edit</a> - 
            <a href="access">Manage access</a>
            <PageContent headerContent={`Project: ${project.name}`}>
                Id: <strong>{project.id}</strong>
                <Typography variant="subtitle2">
                    {project.description}
                </Typography>
            </PageContent>
        </div>

    )

}

export default ViewProjectComponent;