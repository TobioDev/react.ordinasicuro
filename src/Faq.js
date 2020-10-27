import React, { useState, Fragment } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

const Faq = () => {
  const [statoAttivo, setStatoAttivo] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = statoAttivo === index ? -1 : index

    setStatoAttivo(newIndex)
  }

  const activeIndex = statoAttivo




  return (
    <Fragment>
      <h1 className="titolo mb0">F.A.Q.</h1>
      <p className="sottotitolo gray i">Domande Frequenti</p>
      <div className="flex items-center justify-center w-100 mb5">
        <Accordion styled style={{"width": "100%"}}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
            className="w-100" 
          >
            <Icon name='dropdown' />
            <span className="titolo">Come può questo servizio aiutare il settore food nel post emergenza Covid19?</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              Utilizzando il Menu Digitale Ordina Sicuro potrai evitare inutili spese per menu usa e getta o nella igienizzazione dei tuoi normali menu cartacei. Inoltre avrai uno strumento immediato per ricevere gli ordini dei tuoi clienti.
              In questo modo potrai reinvestire le tue risorse in attività e servizi per rilanciare la tua impresa.
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            A chi è rivolto il servizio?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              Il servizio è rivolto a tutti le attività che operano nell'ambito food e che hanno bisogno di utilizzare menù: ristoranti, bar, pub, bagnini, chalet e così via.
            </p>
          </Accordion.Content>


          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Oltre a sfogliare il Menu Digitale, il cliente può anche ordinare?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>
            Certo, è possibile attivare la <b>gestione per asporto e consegna a domicilio</b> in modo tale da renderti <b>completamente autonomo</b> e senza pagare enormi commissioni del 20/30% su ogni ordine che ricevi come impongono altri servizi. Il modulo per asporto e domicilio è attivabile con ZERO COMMISSIONI.
            </p>
          </Accordion.Content>
        </Accordion>
      </div>

    </Fragment>


  )
}

export default Faq