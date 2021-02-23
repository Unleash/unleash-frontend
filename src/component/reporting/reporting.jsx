import React, { useEffect, useState } from "react";

import Select from "../common/select";
import ReportCardContainer from "./report-card-container";
import ReportToggleListContainer from "./report-toggle-list-container";

import styles from "./reporting.module.scss";

const Reporting = ({ fetchFeatureToggles, projects }) => {
    const [projectOptions, setProjectOptions] = useState([
        { key: "default", label: "Default" }
    ]);
    const [selectedProject, setSelectedProject] = useState("default");

    useEffect(() => {
        fetchFeatureToggles();
        setSelectedProject(projects[0].id);
    }, []);

    useEffect(() => {
        setProjectOptions(formatProjectOptions(projects));
    }, [projects]);

    const formatProjectOptions = projects => {
        return projects.map(project => {
            return { key: project.id, label: project.name };
        });
    };

    const onChange = e => {
        const { value } = e.target;

        const selectedProject = projectOptions.find(
            option => option.key === value
        );

        setSelectedProject(selectedProject.key);
    };

    return (
        <React.Fragment>
            <div className={styles.projectSelector}>
                <h1 className={styles.header}>Project</h1>
                <Select
                    name="project"
                    label="project"
                    options={projectOptions}
                    value={setSelectedProject.label}
                    onChange={onChange}
                />
            </div>
            <ReportCardContainer selectedProject={selectedProject} />
            <ReportToggleListContainer selectedProject={selectedProject} />
        </React.Fragment>
    );
};

export default Reporting;
