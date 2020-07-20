import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'


const LoaderOS = ({ visibilita, frase }) => {
    return (
        <Dimmer active={visibilita}>
            <Loader>{frase}</Loader>
        </Dimmer>
    )
}

export default LoaderOS
