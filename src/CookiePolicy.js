import React, { useState, useEffect, Fragment } from 'react'

import SezioneBoxed from './SezioneBoxed'

const CookiePolicy = () => {

    const [cookieHTML, setCookieHTML] = useState('');

    useEffect(() => {


        fetch('https://www.iubenda.com/api/privacy-policy/92168795/cookie-policy')
            .then(response => response.json())
            .then(json => {

                if(json.success=== true){

                    setCookieHTML(json.content) ;

                }
                else{
                    setCookieHTML('Errore di caricamento');
                }

                }
        );


    }, [])

    return (
        <Fragment>

            <SezioneBoxed className="mt6">

            <div dangerouslySetInnerHTML = {{ __html: cookieHTML}}></div>


            </SezioneBoxed>
            
        </Fragment>
    )
}

export default CookiePolicy
