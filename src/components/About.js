import React from 'react'

export default function About() {
    return (
        <div className={'about'}>
            <h1>About this app</h1>
            <p>I created this app because I wanted to use hypothes.is to capture notes while reading articles on my
               iPhone and then bring them to Roam.</p>
            <p>You can read my blog article about
               it <a href={'https://www.henjohoeksma.nl/blog/falling-in-love-with-hypothes-is-and-roam'} title={'Falling in love with hypothes.is and Roam'} target={'_blank'} rel={'noreferrer'}>here</a>.
            </p>
            <h2>Issues or ideas?</h2>
            <p>Did you find an issue or have a feature request? Please use the feedback button on the bottom right! 🚀</p>
            <h2>Privacy</h2>
            <p>This app stores your credentials in your browser and not on the server where this application is running. So no privacy concerns here.</p>
            <p>I do use analytics to track the usage though. If you want to stay out of that you can use a blocker extension.</p>
            <p>I hope you enjoy this tool!</p>
            <p><i>— Henjo</i></p>
        </div>
    )
}
