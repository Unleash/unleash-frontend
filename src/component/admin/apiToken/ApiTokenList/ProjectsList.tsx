import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProjectsList: FC<{ project?: string; projects?: string | string[] }> = ({
    projects,
    project,
}) => {
    let fields = projects && Array.isArray(projects) ? projects : [project];

    return (
        <>
            {fields.map((item, index) => (
                <Fragment key={item}>
                    {index > 0 && ', '}
                    {!item || item === '*' ? (
                        '*'
                    ) : (
                        <Link to={`/projects/${item}`}>{item}</Link>
                    )}
                </Fragment>
            ))}
        </>
    );
};
export default ProjectsList;
