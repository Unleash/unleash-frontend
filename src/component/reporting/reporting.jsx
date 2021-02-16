import React from "react";
import Select from "../common/select";
import ReportCard from "./reportCard";

import styles from "./reporting.module.scss";

const Reporting = () => {
    const projectOptions = [{ key: "default", label: "default" }];

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
        </React.Fragment>
    );
};

export default Reporting;
