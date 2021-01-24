import React, {useState} from 'react'
import {defaultTemplate} from '../App'
import './Template.scss'

export default function Template() {
    const [template, setTemplate] = useState(localStorage.getItem('template'))

    return (
        <div className='template'>
            <h1>Template</h1>
            <p>Set your template, or use the default one.</p>
            <p>You can use a couple of variables:</p>
            <dl>
                <dt><code>&#123;uri&#125;</code></dt>
                <dd>The url of the article</dd>
                <dt><code>&#123;title&#125;</code></dt>
                <dd>The title of the article</dd>
                <dt><code>&#123;notes&#125;</code></dt>
                <dd>The page notes added in hypothes.is</dd>
                <dt><code>&#123;highlights&#125;</code></dt>
                <dd>The highlights including annotations</dd>
                <dt><code>&#123;today&#125;</code></dt>
                <dd>Today's date</dd>
            </dl>
            <hr/>
            <h3>⚠️ Tips</h3>
            <p>Notes and Templates will be indented.<br/>
            If you want to create a horizontal line, use 4 dashes instead of 3.</p>
            <hr/>
            <form onSubmit={(e) => {
                e.preventDefault()
                localStorage.setItem('template', e.target.template.value)
                setTemplate(e.target.template.value)
            }}>

                <textarea name="template" cols="30" rows="10" defaultValue={template ? template : defaultTemplate}></textarea>
                <button type={'submit'} className="button">Save</button>
            </form>
        </div>
    )
}
