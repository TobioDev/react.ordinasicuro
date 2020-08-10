import React, { Fragment, useEffect, useState } from 'react'

import SezioneBoxed from './SezioneBoxed'

const PrivacyPolicy = () => {

    const [policyHTML, setPolicyHTML] = useState('');

    useEffect(() => {


        fetch('https://www.iubenda.com/api/privacy-policy/92168795')
            .then(response => response.json())
            .then(json => {

                if(json.success=== true){

                    setPolicyHTML(json.content) ;

                }
                else{
                    setPolicyHTML('Errore di caricamento');
                }
                
                }
        );
        

    }, [])
    return (
        <Fragment>

            <SezioneBoxed className="mt6">

            <div dangerouslySetInnerHTML = {{ __html: policyHTML}}></div>


            </SezioneBoxed>
            
        </Fragment>
    )
}

export default PrivacyPolicy
