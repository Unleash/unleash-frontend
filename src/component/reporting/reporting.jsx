import React, { useEffect, useState } from "react";

import Select from "../common/select";
import ReportCard from "./report-card";
import ReportToggleListContainer from "./report-toggle-list-container";

import styles from "./reporting.module.scss";

const Reporting = ({ fetchFeatureToggles, projects }) => {
    const [projectOptions, setProjectOptions] = useState([
        { key: "default", name: "default" }
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

    const onChange = () => {
        console.log("Changing");
    };

    return (
        <React.Fragment>
            <div className={styles.projectSelector}>
                <h1 className={styles.header}>Project</h1>
                <Select
                    name="project"
                    label="project"
                    options={projectOptions}
                    value={projectOptions[0].key}
                    onChange={onChange}
                />
            </div>
            <ReportCard />
            <ReportToggleListContainer selectedProject={selectedProject} />
        </React.Fragment>
    );
};

export default Reporting;
