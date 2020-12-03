import React, { Fragment, useState, useEffect } from 'react'
import { Button, Form, Input, Select, TextArea} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
// import setHours from 'date-fns/setHours'
// import setMinutes from 'date-fns/setMinutes'
// import getHours from 'date-fns/setMinutes'

const ModuloInvioOrdine = ({ infoNegozio, idOrdine, arrayOrariDomicilio, arrayOrariAsporto, fasceDomicilio}) => {

    registerLocale("it", it);

    const { register, handleSubmit, setValue, getValues} = useForm();
    const [startDate, setStartDate] = useState();
    const [fraseOrario, setFraseOrario] = useState("Quando vuoi ricevere l'ordine?");
    const [campoFormModificato, setCampoFormModificato] = useState('');
    const [modalitaOrdine, setModalitaOrdine] = useState('domicilio');
    const [optionsSelezionatePerOrari, setOptionsSelezionatePerOrari] = useState([]);

    console.log('modulo');

    useEffect(() => {

        // console.log('effect')

        // console.log('getitem',localStorage.getItem('infoOrdine'));

        // let info = JSON.parse(localStorage.getItem('infoOrdine'))

        // console.log('info', info);

        // if(info !== null && info !== undefined ){

        //     console.log('elseee1');

        //     let presenzaUndefined = false;
        //     [info].map( element => {
        //         console.log([info])
        //         console.log('element', element);
        //             if(element === undefined){
        //                 presenzaUndefined = true;
        //             }
        //         }
        //     )

        //     if(presenzaUndefined=== false){

        //         document.getElementById("nome").value = info.nome;
        //         setValue("nome", info.nome);
        //         document.getElementById("cognome").value = info.cognome;
        //         setValue("cognome", info.cognome);
        //         document.getElementById("indirizzo").value = info.indirizzo;
        //         setValue("indirizzo", info.indirizzo);
        //         document.getElementById("telefono").value = info.telefono;
        //         setValue("telefono", info.telefono);
        //         document.getElementById("email").value = info.email;
        //         setValue("email", info.email);

        //     }
            
            

        // }
        // else{
        //     console.log(' elseeee')
        //         document.getElementById("nome").value = '';
        //         setValue("nome", '');
        //         document.getElementById("cognome").value = '';
        //         setValue("cognome", '');
        //         document.getElementById("indirizzo").value = '';
        //         setValue("indirizzo", '');
        //         document.getElementById("telefono").value = '';
        //         setValue("telefono", '');
        //         document.getElementById("email").value = '';
        //         setValue("email", '');
        // }

    },[])

    //Opzioni per orari fasce consegna a domicilio
    let options_fasce_domicilio = []
    if(arrayOrariDomicilio.length>0){
        arrayOrariDomicilio.map( orario => {
            options_fasce_domicilio.push( { key: orario, text: orario, value: orario+":00" } )
        })
    }
    //console.log({options_fasce_domicilio})

    //Opzioni per orari fasce asporto
    let options_fasce_asporto = []
    arrayOrariAsporto.map( orario => {
        options_fasce_asporto.push( { key: orario, text: orario, value: orario+":00" } )
    })

    //Opzioni modalità consegna/asporto per SELECT
    let options = []
    if(infoNegozio.asporto==='1' && arrayOrariDomicilio.length>0){
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }, { key: 'asporto', text: 'Asporto', value: 'asporto' }]
    }
    else if (infoNegozio.asporto==='1'){
        options = [ { key: 'asporto', text: 'Asporto', value: 'asporto' }]
    }
    else if(arrayOrariDomicilio.length>0){
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }]
    }


    const handleChangeModalita = (e, { name, value }) => {
        if(value==='domicilio'){
            setModalitaOrdine('domicilio')
            setFraseOrario("Quando vuoi ricevere l'ordine?")
            setOptionsSelezionatePerOrari(options_fasce_domicilio)
        }
        else{
            setModalitaOrdine('asporto')
            setFraseOrario("Quando vuoi ritirare l'ordine?")
            setOptionsSelezionatePerOrari(options_fasce_asporto)
        }
        setValue('tipologia_consegna', value);
    }

    //Agganciare campi form Semantic UI con React-Hook-Form
    const handleChangeHookForm = (e, { name, value }) => {
        setCampoFormModificato(name);
        setValue(name, value);
    }
    // const handleChangeHookFormDatepicker = ( date ) => {
    //     console.log(date);
    //     setStartDate(date);
    //     setValue('orario', date.toTimeString().split(' ')[0]);
    // }

    // const handleChangeOrario = ( e ) => {
    //     console.log(e.target.value);
    //     // setStartDate(date);
    //     // setValue('orario', date.toTimeString().split(' ')[0]);
    // }

    useEffect( (campoFormModificato) => {
        register({campoFormModificato});
    },[register])

    let history = useHistory();

    const onSubmit = data => {
        

        if(data.orario !== undefined && data.tipologia_consegna !== undefined){
            console.log(data);

            // localStorage.setItem('infoOrdine', JSON.stringify(data));

            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //     body: JSON.stringify(data)
            // };
            // fetch('https://ordinasicuro.it/670914_920408/lib/api/conferma_ordine', requestOptions)
            //     .then(response => response.json())
            //     .then(dati => {
            //         console.log(dati);
            //         if(dati.presenza_errori===false){
            //             //alert('Successo!');
            //             history.push("/ordine-inviato/");
            //         }
            //         else{
            //             //avviaModale('Attenzione','Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
            //             alert('Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
            //         }
            //     });

        }
        else{
            alert('Compilare tutti i campi richiesti prima di procedere!')
        }

        

        
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)} nome="formConfermaOrdine" id="formConfermaOrdine">
                <Form.Group widths='equal'>
                    <input type="hidden" ref={register} name="id_negozio" id="id_negozio" value={infoNegozio.id} required/>
                    <input type="hidden" ref={register} name="id_ordine" id="id_ordine" value={idOrdine} required/>
                    <Form.Field
                        control={Input}
                        label='Il tuo nome:'
                        onChange={handleChangeHookForm}
                        name="nome"
                        id="nome"
                        placeholder='Il tuo nome'
                        required
                    />
                    <Form.Field
                        control={Input}
                        name="cognome"
                        id="cognome"
                        onChange={handleChangeHookForm}
                        label='Il tuo cognome:'
                        placeholder='Il tuo cognome'
                        required
                    />
                </Form.Group>
                <Form.Field
                    control={Select}
                    label='Tipologia di consegna (a domicilio o asporto, se possibile):'
                    options={options}
                    name="tipologia_consegna"
                    id="tipologia_consegna"
                    placeholder='Seleziona una tiplogia di consegna:'
                    onChange={handleChangeModalita}
                    required
                />
                <Form.Group widths='equal'>
                    {}
                    <Form.Field
                        control={Input}
                        label="Inserisci il tuo indirizzo:"
                        name="indirizzo"
                        id="indirizzo"
                        onChange={handleChangeHookForm}
                        placeholder='Il tuo indirizzo'
                        required
                    />
                    <Form.Field
                        control={Input}
                        label='Il tuo numero di telefono:'
                        name="telefono"
                        id="telefono"
                        onChange={handleChangeHookForm}
                        placeholder='Il tuo numero di telefono'
                        required
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        name="email"
                        id="email"
                        onChange={handleChangeHookForm}
                        label="Inserisci il tuo indirizzo E-mail:"
                        placeholder='La tua e-mail'
                        type="email"
                        required
                    />
                    <Form.Field>
                        <label>{fraseOrario}</label>
                        <Select placeholder='Scegli un orario' selection options={optionsSelezionatePerOrari} name="orario" id="orario" required onChange={handleChangeHookForm}/>
                    </Form.Field>
                    {/* <Form.Field>
                        <label>{fraseOrario}*</label>
                        <DatePicker
                            // onChange={date => setStartDate(date)}
                            // excludeTimes={[
                            // // setHours(setMinutes(new Date(), 0), 17),
                            // // setHours(setMinutes(new Date(), 30), 18),
                            // // setHours(setMinutes(new Date(), 30), 19),
                            // // setHours(setMinutes(new Date(), 30), 17)
                            // ]}
                            selected={startDate}
                            placeholderText="Seleziona un orario"
                            locale="it"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeFormat="HH:mm"
                            timeCaption="Orario"
                            dateFormat="HH:mm"
                            onFocus={(e) => e.target.readOnly = true}
                            onChange={handleChangeHookFormDatepicker}
                            name="orario"
                            id="orario"
                            required
                        />
                    </Form.Field> */}
                </Form.Group>
                <Form.Field>
                    <TextArea 
                        name="nota_finale"
                        id="nota_finale"
                        onChange={handleChangeHookForm}
                        placeholder={"Se vuoi puoi aggiungere una nota all'ordine per "+infoNegozio.nome+" (facoltativo)"}
                    />
                </Form.Field>
            
                <Form.Field>
                    <input type="checkbox" required name="gdpr" id="gdpr"/> Ho letto <a href="/privacy-policy">l'informativa per la privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR. 
                </Form.Field>
                {/* <Form.Field
                    control={Checkbox}
                    name="gdpr"
                    id="gdpr"
                    onChange={handleChangeHookForm}
                    label={<label>Ho letto <a href="https://www.iubenda.com/privacy-policy/92168795">l'informativa per la privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR.</label>}
                    required
                /> */}
                <Button color="green" type='submit' className="w-100">Invia ora il tuo ordine</Button>
            </Form>
        </Fragment>
    )
}

export default ModuloInvioOrdine
