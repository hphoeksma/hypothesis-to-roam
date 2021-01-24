import './App.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Template from './components/Template'
import Hypothesis from './components/Hypothesis'
import Setup from './components/Setup'
import Menu from './decorators/Menu'
import Process from './components/Process'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {SiHypothesis} from 'react-icons/si'
import roam from './astrolabe-white.png'
import React from 'react'
import {IoArrowRedoOutline} from 'react-icons/all'
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

Sentry.init({
    dsn: "https://571a119eb650499988f8451ebd527be5@o108882.ingest.sentry.io/5605602",
    autoSessionTracking: true,
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});

function App() {
    return (
        <Router>
            <div className="app">
                <main>
                    <Route path="/" exact component={Hypothesis} />
                    <Route path="/setup" component={Setup} />
                    <Route path="/template" component={Template} />
                    <Route path="/process" component={Process} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </main>
                <aside>
                    <div>
                        <a href="https://web.hypothes.is/start/" title="hypothes.is" target="_blank" rel="noreferrer">
                            <SiHypothesis />
                        </a>
                        <IoArrowRedoOutline />
                        <a href="https://roamresearch.com/" title="Roam Research" target="_blank" rel="noreferrer">
                            <img src={roam} alt={'Roam Research'} />
                        </a>
                    </div>
                    <Menu />
                </aside>
            </div>
        </Router>
    );
}

export const defaultTemplate = 'Keywords:: #[[Article]] #toProcess\n' +
    'Author:: \n' +
    'Source:: {uri}\n' +
    'Publication date:: \n' +
    'Added:: {today}\n' +
    '----\n' +
    '## Notes\n' +
    '{notes}\n' +
    '## Highlights\n' +
    '{highlights}\n' +
    '----\n'

export default App
