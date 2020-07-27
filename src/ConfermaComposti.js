import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import { Dropdown, Step, Icon, Form, Button} from 'semantic-ui-react'
import SezioneBoxed from './SezioneBoxed';
import ItemConfermaComposti from './ItemConfermaComposti';

const ConfermaComposti = (props) => {

    const { register, handleSubmit, setValue, watch, errors, control} = useForm();

    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [articoliOrdinatiComposti, setArticoliOrdinatiComposti] = useState([]);
    const [articoliComposti, setArticoliComposti] = useState([]);
    const [idOrdine, setIdOrdine] = useState('');
    //const [campoFormModificato, setCampoFormModificato] = useState('');
    //const [valoreFormModificato, setValoreFormModificato] = useState('');


    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/index.php/api/info_componenti/' + props.match.params.id_ordine)
            .then(response => response.json())
            .then(json => {
                setComponentiArticolo(json.get_componenti_articolo_da_negozio);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo_da_negozio);
                setArticoliOrdinatiComposti(json.get_articoli_ordinati_composti);
                setArticoliComposti(json.get_articoli_composti_da_articoli_ordinati);
                setIdOrdine(json.get_ordine.id);
                console.log(json)
                console.log(props.match.params.id_ordine)
                    }
            );

    }, []);

    const stampaSelectComponenti = articoliOrdinatiComposti
                                    .map( (articoloOrdinatoComposto, i) => {
                                        let nome='';
                                        let descrizione='';
                                        let arrayOpzioniComponenti = [];
                                        let quantita = articoloOrdinatoComposto.quantita;
                                        articoliComposti
                                            .filter( articoloComposto => articoloComposto.id === articoloOrdinatoComposto.id_articolo)
                                            .map(articoloCompostoFiltrato => {
                                                                            nome = articoloCompostoFiltrato.nome;
                                                                            descrizione = articoloCompostoFiltrato.descrizione;
                                                                            associazioniComponenteArticolo
                                                                                .filter( associazioneComponenteArticolo => associazioneComponenteArticolo.id_articolo === articoloCompostoFiltrato.id)
                                                                                .map( associazioneComponenteArticoloFiltrato => componentiArticolo
                                                                                                                                    .filter( componenteArticolo => componenteArticolo.id === associazioneComponenteArticoloFiltrato.id_componente)
                                                                                                                                    .map( componenteFiltrato => arrayOpzioniComponenti.push({key: componenteFiltrato.id, text: componenteFiltrato.nome, value: componenteFiltrato.id}) )
                                                                                )}
                                            )
                                            let arraycomp = []            
                                                for (let index = 0; index < quantita; index++) {
                                                    arraycomp.push(
                                                        <div className="pa3 ba b--black-30 br3 mb3" key={articoloOrdinatoComposto.id+index}>
                                                            <h4>{index+1} - {nome}</h4>
                                                            <p>{descrizione}</p>
                                                            <ItemConfermaComposti idArticolo={articoloOrdinatoComposto.id_articolo} arrayOpzioniComponenti={arrayOpzioniComponenti} index={index} setValue={setValue} register={register}/>
                                                            {/* <Dropdown onChange={handleChange} name={"componenti-"+articoloOrdinatoComposto.id_articolo+"-"+index} id={"componenti"+articoloOrdinatoComposto.id_articolo} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti} required/> */}
                                                        </div> 
                                                    )
                                                    
                                                    
                                                } 
                                            return arraycomp                                           
                                                

                                    }
                    
                                    )

    

    

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <SezioneBoxed className="mt6">
            <Step.Group stackable="tablet" size="tiny">
                <Step completed >
                    <Icon name='credit card' />
                    <Step.Content>
                        <Step.Title>1 - Scegli</Step.Title>
                        <Step.Description>Scegli cosa vuoi ordinare</Step.Description>
                    </Step.Content>
                </Step>
                <Step active>
                    <Icon name='clipboard check' />
                    <Step.Content>
                        <Step.Title>2 - Scegli le opzioni</Step.Title>
                        <Step.Description>Scegli le opzioni o i componenti per questi prodotti</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>
            <p className="tc">Alcuni dei tuoi prodotti hanno delle opzioni o dei componenti fra cui scegliere</p>
            <Form onSubmit={handleSubmit(onSubmit)} nome="formComponenti" id="formComponenti">
                {stampaSelectComponenti}
                <Button color="green" type='submit'>Invia ora il tuo ordine</Button>
            </Form>


        </SezioneBoxed>
    )
    
}

export default ConfermaComposti
