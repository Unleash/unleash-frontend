import React from 'react';
import { Checkbox } from 'react-mdl';

const ReportToggleListItem = ({ name, stale, lastSeenAt, createdAt, checked, setToggleRowData }) => {
    const handleChange = () => {
        setToggleRowData(prevState => {
            const newState = [...prevState];
            return newState.map(feature => {
                if (nameMatches(feature)) {
                    return { ...feature, checked: !feature.checked };
                }
                return feature;
            });
        });
    };

    const nameMatches = feature => feature.name === name;

    console.log(checked);

    return (
        <tr>
            <td>
                <Checkbox checked={checked} value={checked} onChange={handleChange} />
            </td>
            <td>{name}</td>
            <td>50 days</td>
            <td>100 days ago</td>
            <td>60 days ago</td>
            <td>{stale ? 'Stale' : 'Active'}</td>
            <td>Potentially stale</td>
        </tr>
    );
};

export default React.memo(ReportToggleListItem);
