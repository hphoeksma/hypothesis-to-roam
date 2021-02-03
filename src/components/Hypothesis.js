import React, {Fragment, useState} from "react"
import {Link} from "react-router-dom"
import Articles from './Articles'

export default function Hypothesis() {
    const user = useState(localStorage.getItem('user'))[0]
    const apiToken = useState(localStorage.getItem('token'))[0]

    if (!user || !apiToken) {
        return <p className={'text-center'}>
            Looks like you haven't setup the application yet. It's a breeze to get hooked up, promise! 🤞🏻<br/>
            <br/>
            <Link to={'/setup'} className={'button button--inline'}>Go to setup</Link>
        </p>
    }

    return (
        <Fragment>
            <Articles/>
        </Fragment>
    )
}
