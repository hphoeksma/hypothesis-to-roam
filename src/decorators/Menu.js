import React from 'react'
import {NavLink} from 'react-router-dom'
import './Menu.scss'
import {IoBookmarkOutline, IoCogOutline} from 'react-icons/all'

export default function Menu() {
    return (
        <nav>
            <NavLink to={'/'}><IoBookmarkOutline /> <span>Home</span></NavLink>
            <NavLink to={'/setup'}><IoCogOutline/> <span>Settings</span></NavLink>
        </nav>
    )
}
