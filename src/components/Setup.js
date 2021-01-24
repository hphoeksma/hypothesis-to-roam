import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import './Setup.scss'

export default function Setup() {
    const [apiToken, setApiToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(localStorage.getItem('user'))
    if (apiToken && user) {
        localStorage.setItem('token', apiToken)
        localStorage.setItem('user', user)
        return (
            <Fragment>
                <h1>Settings</h1>
                <p>Your token and user are set.</p>
                <p><Link to={'/'} className={'button button--inline'}>Start using the app</Link> or <Link to={'/template'} className={'button button--inline'}>Change the template</Link></p>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <h1>Setup</h1>
            <p>All settings are stored in the localstorage of your browser.</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                setApiToken(e.target.token.value)
                setUser(e.target.user.value)
            }}>
                <input type="text" name={'token'} placeholder={'Paste your api token'} required={'required'} defaultValue={apiToken}/>
                <input type="text" name={'user'} placeholder={'Fill in your hypothes.is username'} required={'required'} />
                <button type={'submit'}>Finish Setup</button>
            </form>
        </Fragment>
    )
}
