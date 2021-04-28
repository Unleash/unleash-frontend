import { throwIfNotSuccess } from '../api-helper';

const URI = 'api/admin/ui-bootstrap';

function fetchUIBootstrap() {
    return fetch(URI, { credentials: 'include' })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

export default {
    fetchUIBootstrap,
};
