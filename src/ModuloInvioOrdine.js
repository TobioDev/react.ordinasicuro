import React, { Fragment, useState} from 'react'
import { Button, Checkbox, Form, Input, Select, TextArea} from 'semantic-ui-react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

const ModuloInvioOrdine = ({ infoNegozio, oraInizioAsporto, oraFineAsporto}) => {

    
    registerLocale("it", it);

    const [startDate, setStartDate] = useState(new Date());
    const [fraseOrario, setFraseOrario] = useState("Quando vuoi ricevere l'ordine?")

    let options = []

    if(infoNegozio.asporto==='1'){
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }, { key: 'asporto', text: 'Asporto', value: 'asporto' },]
    }
    else{
        options = [ { key: 'domicilio', text: 'A domicilio', value: 'domicilio' }]
    }

    
    const handleChange = (e, { name, value }) => {
        if(value==='domicilio'){
            setFraseOrario("Quando vuoi ricevere l'ordine?")
        }
        else{
            setFraseOrario("Quando vuoi ritirare l'ordine?")
        }
    }

    return (
        <Fragment>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='Il tuo nome*'
                        placeholder='Il tuo nome'
                    />
                    <Form.Field
                        control={Input}
                        label='Il tuo cognome*'
                        placeholder='Il tuo cognome'
                    />
                </Form.Group>
                <Form.Field
                    control={Select}
                    label='Tipologia di consegna (a domicilio o asporto, se possibile):'
                    options={options}
                    placeholder='Seleziona una tiplogia di consegna'
                    onChange={handleChange}
                />
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label="Inserisci il tuo indirizzo*:"
                        placeholder='Il tuo nome'
                    />
                    <Form.Field
                        control={Input}
                        label='Il tuo numero di telefono*'
                        placeholder='Il tuo numero di telefono*:'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label="Inserisci il tuo indirizzo E-mail*:"
                        placeholder='La tua e-mail'
                        type="email"
                    />
                    <Form.Field>
                        <label>{fraseOrario}*</label>
                        <DatePicker
                            // selected={startDate}
                            // onChange={date => setStartDate(date)}
                            // showTimeSelectOnly
                            // excludeTimes={[
                            // // setHours(setMinutes(new Date(), 0), 17),
                            // // setHours(setMinutes(new Date(), 30), 18),
                            // // setHours(setMinutes(new Date(), 30), 19),
                            // // setHours(setMinutes(new Date(), 30), 17)
                            // ]}
                            // dateFormat="d MMMM yyyy, H:mm"
                            // timeFormat="HH:mm"
                            // locale="it"
                            // onFocus={(e) => e.target.readOnly = true}
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            locale="it"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeFormat="HH:mm"
                            timeCaption="Orario"
                            dateFormat="HH:mm"
                            onFocus={(e) => e.target.readOnly = true}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <TextArea 
                        placeholder={"Se vuoi puoi aggiungere una nota all'ordine per "+infoNegozio.nome+" (facoltativo)"}
                    />
                </Form.Field>
            
                <Form.Field>
                    <Checkbox label={<label>Ho letto <a href="https://www.iubenda.com/privacy-policy/92168795">l'informativa per la privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR.</label>} />
                </Form.Field>
                <Button color="green" type='submit'>Invia ora il tuo ordine</Button>
            </Form>
        </Fragment>
    )
}

export default ModuloInvioOrdine
