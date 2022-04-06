import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const ProjectsList = ({
    projects,
    project,
}: {
    project?: string;
    projects?: string | string[];
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
