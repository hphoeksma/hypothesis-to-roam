import * as api from './_methods'
const apiToken = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const headers = {
    Authorization: `Bearer ${apiToken}`,
    Accept: 'application/vnd.hypothesis.v1+json'
}
export const baseUri = 'https://api.hypothes.is/api';

/**
 *
 * @param {object} params
 * @param {boolean} restrictToUser
 * @returns {string}
 */
export const getParams = (params, restrictToUser) => {
    if (restrictToUser) {
        params.user = `acct:${user}@hypothes.is`
    }

    return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
}

export {api};
