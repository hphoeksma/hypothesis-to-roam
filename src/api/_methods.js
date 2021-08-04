import {baseUri, getParams, headers} from './api'

/**
 * All possible search method
 * @param {object} params
 * @param {boolean} restrictToUser
 */
export const search = (params, restrictToUser = true) => {
    const url = `${baseUri}/search?${getParams(params, restrictToUser)}`
    fetch(url, {headers: headers})
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error))
}

export const getUniqueUrls = async () => {
    const url = `${baseUri}/search?${getParams({}, true)}`
    let response = await fetch(url, {headers: headers})
    let result = await response.json()
    return [...new Map(result.rows.map(item => [
        item['uri'],
        {
            uri: item.uri,
            title: (item.document.title !== undefined && item.document.title.length !== 0) ? item.document.title[0] : 'No title',
        }
    ])).values()]
}

export const getAnnotationsByUri = async (uri) => {
    const url = `${baseUri}/search?${getParams({uri:uri}, true)}`
    let response = await fetch(url, {headers: headers})
    let result = await response.json()
    return result.rows
}

export const deleteAnnotation = async (id) => {
    const url = `${baseUri}/annotations/${id}`
    let response = await fetch(url, {method: 'DELETE', headers: headers})
    let result = await response.json()
    return result.deleted
}
