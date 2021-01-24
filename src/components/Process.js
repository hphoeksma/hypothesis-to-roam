import React, {Fragment, useState, useRef} from 'react'
import {api} from '../api/api'
import './Process.scss'
import moment from 'moment'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {
    HiOutlineClipboardCopy,
    ImSpinner8,
    IoArrowRedoOutline,
} from 'react-icons/all'
import {defaultTemplate} from '../App'

export default function Process(props) {
    const uri = props.location.search.split('=')[1]
    const [annotations, setAnnotations] = useState(null)
    const template = localStorage.getItem('template') ? localStorage.getItem('template') : defaultTemplate
    const textarea = useRef(null)
    const title = useRef(null)

    if (!annotations) {
        api.getAnnotationsByUri(uri)
            .then(result => {
                if (result.length) {
                    return setAnnotations(result)
                } else {
                    toast.error(({closeToast}) => <div>⚠️ This url no longer contains annotations on
                                                       Hypothesis <Link to={'/'}>Go home</Link></div>, {
                        autoClose: false,
                        position: "top-center"
                    })
                }
            })
    }

    const getAnnotations = (type) => {
        const highlights = []

        if (annotations) {
            annotations.forEach(annotation => {
                annotation.target.forEach(target => {
                    const highlight = {
                        text: annotation.text
                    }
                    if (target.selector) {
                        target.selector.forEach(selector => {
                            if (selector.type === 'TextQuoteSelector') {
                                highlight.highlight = selector.exact
                            }
                        })
                    }
                    highlights.push(highlight)
                })
            })
        }

        switch (type) {
            case 'notes':
                return highlights.filter(highlight => !highlight.hasOwnProperty('highlight'))
                    .map(highlight => `\t${highlight.text}`)
                    .join('\n')
            default:
                return highlights.filter(highlight => highlight.hasOwnProperty('highlight'))
                    .map(highlight => {
                        let item = `\t${highlight.highlight}`
                        if (highlight.text !== '') {
                            item += `\n\t\t${highlight.text}`
                        }
                        return item
                    })
                    .join('\n')
        }
    }

    const copyTitle = () => {
        title.current.select()
        document.execCommand('copy')
        toast.info('🚀 The title is copied, use it to create a new page in Roam!')
    }

    const copyTemplate = () => {
        textarea.current.select()
        document.execCommand('copy')
        toast.info(`🚀 The content is copied, paste it in your Roam! ${<Link to="/">Go home</Link>}`)
    }

    const cleanupHypothesis = () => {
        annotations.forEach(annotation => {
            console.log(annotation.id)
            api.deleteAnnotation(annotation.id).then(result => {
                if (result === true) {
                    toast.warn('👍🏻 Annotation removed')
                }
            })
        })
    }

    return (
        <Fragment>
            {!annotations ? <p className={'has-loader'}><ImSpinner8 className={'loading'} /> Preparing annotations, please hold... (it won't take long 😎)</p> :
                <div className={'process'}>
                    <h2>Copy your content</h2>
                    <h3>Title</h3>
                    <div className="textarea-wrapper">
                        <textarea ref={title} defaultValue={annotations[0].document.title[0]}></textarea>
                        <button onClick={copyTitle} title={'Copy the title'} className={'button button--plain'}><HiOutlineClipboardCopy/></button>
                    </div>
                    <h3>Contents</h3>
                    <div className="textarea-wrapper">
                        <textarea
                            className={'display-linebreak'}
                            ref={textarea}
                            defaultValue={
                                template
                                    .replace('{uri}', uri)
                                    .replace('{today}', moment(new Date()).format("MMMM Do, YYYY"))
                                    .replace('{title}', annotations[0].document.title[0])
                                    .replace('{notes}', getAnnotations('notes'))
                                    .replace('{highlights}', getAnnotations('highlights'))
                            }></textarea>
                        <button onClick={copyTemplate} title={'Copy the contents'} className={'button button--plain'}><HiOutlineClipboardCopy/></button>
                    </div>
                    <h2>
                        <span>Finished? Clean up hypothes.is if you like...</span>
                        <button onClick={cleanupHypothesis} className={'button button--warning button--inline'}>Remove annotations from hypothes.is</button>
                    </h2>
                    <Link to={'/'} className={'back'} title={'Go back'}><IoArrowRedoOutline /> Go back</Link>
                </div>
            }
        </Fragment>

    )
}
