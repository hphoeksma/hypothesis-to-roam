import React, {Fragment, useState} from "react"
import {Redirect} from "react-router-dom"
import Articles from './Articles'

export default function Hypothesis() {
    const user = useState(localStorage.getItem('user'))[0]
    const apiToken = useState(localStorage.getItem('token'))[0]

    if (!user || !apiToken) {
        return <Redirect to={'/setup'}/>
    }

    return (
        <Fragment>
            <Articles/>
        </Fragment>
    )
}
