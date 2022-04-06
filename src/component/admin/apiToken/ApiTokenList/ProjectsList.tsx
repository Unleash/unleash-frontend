import React, { Fragment, VFC } from 'react';
import { Link } from 'react-router-dom';

interface IProjectsListProps {
    project?: string;
    projects?: string | string[];
}

export const ProjectsList: VFC<IProjectsListProps> = ({
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
