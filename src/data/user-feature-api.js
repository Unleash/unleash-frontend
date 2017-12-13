import { throwIfNotSuccess, headers } from './helper';

const URI = 'api/admin/user';

function fetchAll(userId) {
    return fetch(`${URI}/${userId}/features`, { credentials: 'include' })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

// function update(featureToggle) {
//     return validateToggle(featureToggle)
//         .then(() =>
//             fetch(`${URI}/${featureToggle.name}`, {
//                 method: 'PUT',
//                 headers,
//                 credentials: 'include',
//                 body: JSON.stringify(featureToggle),
//             })
//         )
//         .then(throwIfNotSuccess);
// }

function toggle(userId, name) {
    console.log(userId);
    console.log(name);
    return fetch(`/${URI}/${userId}/features/${name}/toggle`, {
        method: 'POST',
        headers,
        credentials: 'include',
    }).then(throwIfNotSuccess);
}

export default {
    fetchAll,
    toggle,
};
