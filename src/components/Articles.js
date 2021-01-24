import React, {Fragment, useState} from 'react'
import {api} from '../api/api'
import Article from './Article'
import {ImSpinner8} from 'react-icons/all'

export default function Articles() {
    const [items, setItems] = useState()
    const [loaded, setLoaded] = useState(false)

    if (!items) {
        api.getUniqueUrls()
            .then(result => {
                setItems(result)
                setLoaded(true)
            })
    }
    return (
        <Fragment>
            {!loaded && <p className={'has-loader'}><ImSpinner8 className={'loading'} /> Loading your articles, please wait...</p>}
            {!items && loaded &&
                <div>
                    <p>No articles found.</p>
                    <p>If you are sure you have articles on hypothes.is, try refreshing the page (or double check your token and username).</p>
                </div>
            }
            {items && loaded &&
                <div className={'articles'}>
                    <h2>Your articles on hypothes.is</h2>
                    {items.map((item, i) => <Article data={item} key={i} />)}
                </div>}
        </Fragment>
    )
}
