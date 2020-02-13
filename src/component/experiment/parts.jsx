import React from 'react';

export function SubSection(props) {
    return (
        <section style={{ padding: '16px',  marginTop: '25px', border: '1px solid #EFEFEF' }}>
            <h6 style={{ marginTop: '0' }}>{props.title}</h6>
            {props.children}
        </section>
    );
}