import React, { Fragment } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { HashLink as Link } from 'react-router-hash-link';

import { Step, Message, Button, Icon } from 'semantic-ui-react'

const OrdineInviato = () => {

    window.scrollTo(0,0);
    
    return (
        <Fragment>
            <SezioneBoxed className="mt6">

                <Step.Group ordered>
                    <Step completed>
                        <Step.Content>
                            <Step.Title>Inviato!</Step.Title>
                            <Step.Description>Il tuo ordine è stato inviato con succcesso!</Step.Description>
                        </Step.Content>
                    </Step>

                </Step.Group>

            </SezioneBoxed>

            <SezioneBoxed>
                <h1 className="tc">Il tuo ordine è stato inviato! <span role="img" aria-label="thumbs up">👍🏻</span></h1>
                <Message
                    success
                    header='Abbiamo ricevuto il tuo ordine!'
                    content="Il tuo ordine è stato inviato con successo e verrà elaborato a breve. Controlla nella tua casella e-mail: fra pochi istanti riceverai la conferma del tuo ordine. Se non trovi l'email di conferma controlla anche nella casello dello SPAM."
                />
            </SezioneBoxed>
            <SezioneBoxed>
            <Link to="/">
                <Button
                    icon
                    labelPosition='left'

                >
                    <Icon name='home' />
                        Torna alla Home
                </Button>
            </Link>
            
            </SezioneBoxed>
            
        </Fragment>
    )
}

export default OrdineInviato
