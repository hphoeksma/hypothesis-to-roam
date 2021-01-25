import React from 'react'
import {SiHypothesis} from 'react-icons/si'

export default function LinkToHypothesis(props) {
    return (
        <a href={`https://via.hypothes.is/${props.uri}`} title="View on hypothes.is" target="_blank" rel="noreferrer">
            {props.prefix && 'view on '}<SiHypothesis/>
        </a>
    )
}
