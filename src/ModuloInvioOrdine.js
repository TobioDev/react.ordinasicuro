import React, { Fragment, useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, TextArea} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import getHours from 'date-fns/setMinutes'

const ModuloInvioOrdine = ({ infoNegozio, oraInizioAsporto, oraFineAsporto}) => {

    registerLocale("it", it);

    const { register, handleSubmit, setValue, watch, errors} = useForm();
    const [startDate, setStartDate] = useState();
    const [fraseOrario, setFraseOrario] = useState("Quando vuoi ricevere l'ordine?");
    const [campoFormModificato, setCampoFormModificato] = useState('');
    const [modalitaOrdine, setModalitaOrdine] = useState('domicilio');

    //Opzioni modalità consegna/asporto
    let options = []
    if(infoNegozio.asporto==='1'){
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }, { key: 'asporto', text: 'Asporto', value: 'asporto' },]
    }
    else{
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }]
    }
    const handleChangeModalita = (e, { name, value }) => {
        if(value==='domicilio'){
            setModalitaOrdine('domicilio')
            setFraseOrario("Quando vuoi ricevere l'ordine?")
        }
        else{
            setModalitaOrdine('asporto')
            setFraseOrario("Quando vuoi ritirare l'ordine?")
        }
    }

    //Agganciare campi form Semantic UI con React-Hook-Form
    const handleChangeHookForm = (e, { name, value }) => {
        setCampoFormModificato(name);
        setValue(name, value);
    }
    const handleChangeHookFormDatepicker = ( date ) => {
        setStartDate(date);
        setValue('orario', date.toTimeString().split(' ')[0]);
    }

    useEffect( () => {
        register({campoFormModificato});
    },[register])

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)} nome="formConfermaOrdine" id="formConfermaOrdine">
                <Form.Group widths='equal'>
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
                    onChange={handleChangeHookForm}
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
                    </Form.Field>
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
                    <Checkbox label={<label>Ho letto <a href="https://www.iubenda.com/privacy-policy/92168795">l'informativa per la privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR.</label>} required />
                </Form.Field>
                <Button color="green" type='submit' className="w-100">Invia ora il tuo ordine</Button>
            </Form>
        </Fragment>
    )
}

export default ModuloInvioOrdine
