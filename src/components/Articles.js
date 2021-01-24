import React, {Fragment, useState} from 'react'
import {api} from '../api/api'
import Article from './Article'
import {ImSpinner8} from 'react-icons/all'

export default function Articles() {
    const [items, setItems] = useState()
    if (!items) {
       api.getUniqueUrls()
           .then(result => {
               setItems(result)
           })
    }
    return (
        <Fragment>
            {!items ?
                <p className={'has-loader'}><ImSpinner8 className={'loading'} /> Loading your articles, please wait...</p> :
                <div className={'articles'}>
                    <h2>Your articles on hypothes.is</h2>
                    {items.map((item, i) => <Article data={item} key={i}/>)}
                </div>
            }
        </Fragment>
    )
}
