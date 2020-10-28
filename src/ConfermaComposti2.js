import React, { useState, useEffect, Fragment } from 'react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

import { Step, Icon, Form, Button} from 'semantic-ui-react'
import SezioneBoxed from './SezioneBoxed';
import ItemConfermaComposti from './ItemConfermaComposti';
import ModaleConfermaComposti2 from './ModaleConfermaComposti2';

const ConfermaComposti2 = (props) => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [articoliOrdinatiComposti, setArticoliOrdinatiComposti] = useState([]);
    const [articoliComposti, setArticoliComposti] = useState([]);
    const [idOrdine, setIdOrdine] = useState('');
    //const [campoFormModificato, setCampoFormModificato] = useState('');
    //const [valoreFormModificato, setValoreFormModificato] = useState('');


    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/info_componenti/' + props.match.params.id_ordine)
            .then(response => response.json())
            .then(json => {
                setComponentiArticolo(json.get_componenti_articolo_da_negozio);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo_da_negozio);
                setArticoliOrdinatiComposti(json.get_articoli_ordinati_composti);
                setArticoliComposti(json.get_articoli_composti_da_articoli_ordinati);
                setIdOrdine(json.get_ordine.id);
                //console.log(json)
                //console.log(props.match.params.id_ordine)
                    }
            );

    }, []);

    const stampaSelectComponenti = articoliOrdinatiComposti
                                    .map( (articoloOrdinatoComposto, i) => {
                                        let nome='';
                                        let descrizione='';
                                        let numeroMaxComponenti='';
                                        let infoArticolo={};
                                        let arrayOpzioniComponenti = [];
                                        let quantita = articoloOrdinatoComposto.quantita;
                                        articoliComposti
                                            .filter( articoloComposto => articoloComposto.id === articoloOrdinatoComposto.id_articolo)
                                            .map(articoloCompostoFiltrato => {
                                                                            infoArticolo= articoloCompostoFiltrato;
                                                                            nome = articoloCompostoFiltrato.nome;
                                                                            descrizione = articoloCompostoFiltrato.descrizione;
                                                                            numeroMaxComponenti = articoloCompostoFiltrato.numero_max_componenti;
                                                                            associazioniComponenteArticolo
                                                                                .filter( associazioneComponenteArticolo => associazioneComponenteArticolo.id_articolo === articoloCompostoFiltrato.id)
                                                                                .map( associazioneComponenteArticoloFiltrato => componentiArticolo
                                                                                                                                    .filter( componenteArticolo => componenteArticolo.id === associazioneComponenteArticoloFiltrato.id_componente)
                                                                                                                                    .map( componenteFiltrato => {
                                                                                                                                        arrayOpzioniComponenti.push(componenteFiltrato);
                                                                                                                                        // let url_temp = '';
                                                                                                                                        // if(componenteFiltrato.url_immagine !== ''){
                                                                                                                                        //     url_temp = 'https://www.ordinasicuro.it/670914_920408/lib/img_componenti/img_componenti_compressed/'+componenteFiltrato.url_immagine;
                                                                                                                                        // }
                                                                                                                                        // arrayOpzioniComponenti.push({key: componenteFiltrato.id, text: componenteFiltrato.nome, value: componenteFiltrato.id, image: { avatar: true, src: url_temp }})
                                                                                                                                    } )
                                                                                )}
                                            )
                                            let arraycomp = []            
                                                for (let index = 0; index < quantita; index++) {
                                                    arraycomp.push(
                                                            <ModaleConfermaComposti2 idArticolo={articoloOrdinatoComposto.id_articolo} infoArticolo={infoArticolo} numeroMaxComponenti={numeroMaxComponenti} arrayOpzioniComponenti={arrayOpzioniComponenti} index={index} setValue={setValue} register={register} getValues={getValues}/>
                                                    )
                                                    
                                                    
                                                } 
                                            return arraycomp                                           
                                                

                                    }
                    
                                    )

    

    let history = useHistory();

    const onSubmit = data => {
        // console.log(data);
        // console.log(Object.keys(data))
        let variabileFormCompleto = true;
        Object.keys(data).map(dato => {
            // console.log('lenght', data[dato].length)
            // console.log('comp', dato.includes('componenti'))
            if(dato.includes('componenti') && data[dato].length === 0){
                variabileFormCompleto = false;
            }
        });
        // console.log('var',variabileFormCompleto)
        // let variabileFormCompleto = true;
        
        // console.log(arrayTotale);
        //arrayTotale.map( campo => {if(campo[1]===0 || campo[1] === undefined){variabileFormCompleto = false; console.log(campo[1]); console.log('var',variabileFormCompleto);}})
        if(variabileFormCompleto === false){
            alert("Prima di procedere è necessario selezionare almeno un'opzione per ogni prodotto ordinato")
        }
        else{
            let arrayTotale = Object.entries(data);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(arrayTotale)
            };
            fetch('https://ordinasicuro.it/670914_920408/lib/api/aggiungi_associazioni_ordine_componente_articolo', requestOptions)
            .then(response => response.json())
            .then(dati => {
                if(dati.presenza_errori===false){
                    history.push("/conferma-ordine/"+idOrdine);

                }
                else{
                    //avviaModale('Attenzione','Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                    alert("Si è verificato un errore durante l'invio del tuo ordine. Riprova di nuovo.")
                }
            });
        }
        // //console.log(variabileFormCompleto);
        // console.log(arrayTotale)
        //console.log(data)
    }

    return (
        <Fragment>
            <SezioneBoxed className="mt6 mb3">
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
                <p className="tc">Alcuni dei tuoi prodotti hanno delle opzioni o dei componenti fra cui scegliere <span role="img" aria-label="down">👇🏻</span> </p>
                <Form onSubmit={handleSubmit(onSubmit)} nome="formComponenti" id="formComponenti" className="mb4 w-90">
                    <input ref={register} type="hidden" id="idOrdine" name="idOrdine" value={idOrdine}/>
                    {stampaSelectComponenti}
                </Form>


            </SezioneBoxed>
            <Button animated fluid color="green" size="large" className="bottom-0" style={{"position" : "fixed"}} type="submit" form="formComponenti">
                <Button.Content visible>Prosegui e vai al riepilogo <Icon name='arrow right' /></Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                </Button.Content>
            </Button>
        </Fragment>
    )
    
}

export default ConfermaComposti2
