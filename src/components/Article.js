import React,{useState} from 'react'
import './Article.scss'
import {Redirect} from 'react-router-dom'
import {IoCopyOutline} from 'react-icons/all'

export default function Article(props) {
    const data = props.data
    const [processing, setProcessing] = useState(false)

    if (processing) {
        return <Redirect to={`/process?uri=${data.uri}`} />
    }
    const handleProcess = () => {
        return setProcessing(true)
    }

    return (
        <article>
            {data.title}
            <span>
                <button onClick={handleProcess} className={'button'}><IoCopyOutline/> <span>Process notes</span></button>
            </span>
        </article>
    )
}
