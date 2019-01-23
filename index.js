'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
    publicFolder: path.join(__dirname, 'dist'),
    loadStyle(style) {
        return new Promise((resolve, reject) => {
            const styleSheet = style ? `material.${style}.min.css` : 'material.min.css';
            const file = require.resolve(`react-mdl/extra/css/${styleSheet}`);
            fs.copyFile(file, path.join(__dirname, 'dist/public/material.min.css'), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },
};
