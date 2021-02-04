import React, {Fragment, useRef, useState} from 'react'
import {api} from '../api/api'
import './Process.scss'
import moment from 'moment'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {FaTrashAlt, HiOutlineClipboardCopy, ImSpinner8, IoArrowRedoOutline,} from 'react-icons/all'
import {defaultTemplate} from '../App'
import LinkToHypothesis from '../decorators/LinkToHypothesis'
import TurndownService from 'turndown'

export default function Process(props) {
    const uri = props.location.search.split('=')[1]
    const [annotations, setAnnotations] = useState(null)
    const [article, setArticle] = useState(null)
    const template = localStorage.getItem('template') ? localStorage.getItem('template') : defaultTemplate
    const textarea = useRef(null)
    const title = useRef(null)
    const articleText = useRef(null)
    const tagJoin = localStorage.getItem('tagjoin') ? localStorage.getItem('tagjoin') : ' '

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
        const allTags = []

        if (annotations) {
            annotations.forEach(annotation => {
                annotation.target.forEach(target => {
                    const highlight = {
                        text: annotation.text,
                        tags: annotation.tags && annotation.tags.map(tag => `#[[${tag}]]`).join(tagJoin)
                    }
                    if (target.selector) {
                        target.selector.forEach(selector => {
                            if (selector.type === 'TextQuoteSelector') {
                                highlight.highlight = selector.exact
                            }
                        })
                    }
                    highlights.push(highlight)
                    allTags.push(highlight.tags)
                })

            })
        }

        switch (type) {
            case 'allTags':
                return allTags.join(tagJoin)
            case 'notes':
                return highlights.filter(highlight => !highlight.hasOwnProperty('highlight'))
                    .map(highlight => `\t${highlight.text} ${highlight.tags}`)
                    .join('\n')
            default:
                return highlights.filter(highlight => highlight.hasOwnProperty('highlight'))
                    .map(highlight => {
                        let item = `\t${highlight.highlight} ${highlight.tags}`
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
        toast.info(`🚀 The content is copied, paste it in your Roam!`)
    }

    const copyArticle = () => {
        articleText.current.select()
        document.execCommand('copy')
        toast.info(`🚀 The content is copied, paste it in your Roam!`)
    }

    const fetchArticle = () => {
        const turndownService = new TurndownService()
        fetch('https://cors-anywhere.herokuapp.com/' + uri).then(response => response.text())
            .then(data => {
                // Convert the HTML string into a document object
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const markdown = turndownService.turndown(doc.querySelector('article'));
                if (markdown) {
                    setArticle(markdown)
                }

            }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
    }

    const cleanupHypothesis = () => {
        annotations.forEach(annotation => {
            api.deleteAnnotation(annotation.id).then(result => {
                if (result === true) {
                    toast.success('👍🏻 Annotation removed')
                }
            })
        })
    }

    // Fetch the article contents
    if (article === null) {
        fetchArticle();
    }

    return (
        <Fragment>
            {!annotations ?
                <p className={'has-loader'}><ImSpinner8 className={'loading'} /> Preparing annotations, please hold...
                                                                                 (it won't take long 😎)</p> :
                <div className={'process'}>
                    <h2><span>Copy your content</span><LinkToHypothesis uri={uri} prefix={true} /></h2>
                    <h3>Title</h3>
                    <div className="textarea-wrapper">
                        <textarea ref={title} defaultValue={annotations[0].document.title[0]}></textarea>
                        <button onClick={copyTitle} title={'Copy the title'} className={'button button--plain'}>
                            <HiOutlineClipboardCopy /></button>
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
                                    .replace('{allTags}', getAnnotations('allTags'))
                            }></textarea>
                        <button onClick={copyTemplate} title={'Copy the contents'} className={'button button--plain'}>
                            <HiOutlineClipboardCopy /></button>
                    </div>
                    <h3>Article <span className="experimental">Experimental</span></h3>
                    <p className="note">We attempt to fetch the contents of the article and convert it to Markdown. If succeeded, it will
                       show up here.<br />
                       Please be aware that copying large amounts of texts into Roam may lead to a freeze of Roam.</p>
                    <div className="textarea-wrapper">
                        <textarea
                            className={'display-linebreak'}
                            ref={articleText}
                            defaultValue={article}></textarea>
                        <button onClick={copyArticle} title={'Copy the contents'} className={'button button--plain'}>
                            <HiOutlineClipboardCopy /></button>
                    </div>
                    <h2>
                        <span>Finished? Clean up hypothes.is if you like...</span>
                        <button onClick={cleanupHypothesis} className={'button button--warning button--inline'}>
                            <FaTrashAlt /> Remove annotations from hypothes.is
                        </button>
                    </h2>
                    <Link to={'/'} className={'back'} title={'Go back'}><IoArrowRedoOutline /> Go back</Link>
                </div>
            }
        </Fragment>

    )
}
