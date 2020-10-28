import React, { Fragment, useState } from 'react';

import { useForm } from "react-hook-form"

import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const IscrizioneOS = () => {

	const { register, handleSubmit } = useForm();

	const [ aperturaModale, setAperturaModale ] = useState(false);
    const [ titoloModale, setTitoloModale] = useState('');
	const [ messaggioModale, setMessaggioModale] = useState('');
	
	const avviaModale = (titolo, testo) => {
        setAperturaModale(true);
        setTitoloModale(titolo);
        setMessaggioModale(testo);
	}
	
	const chiudiModale = () => setAperturaModale(false);

	const onSubmit = data => {

        console.log(data);

        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: JSON.stringify(data)
		};
		fetch('https://ordinasicuro.it/670914_920408/lib/api/contatta', requestOptions)
			.then(response => response.json())
			//.then(text => console.log(text))
			.then(dati => {
				if(dati.presenza_errori===false){
					avviaModale('Richiesta di iscrizione inviata!','La tua richiesta di iscrizione è stata inviata con successo! Riceverai a breve una mail contenente tutte le istruzioni!');
					//history.push("/ordine-inviato/");
				}
				else{
					avviaModale('Attenzione', 'Si è verificato un errore durante l\'invio della tua iscrizione. Riprova di nuovo.');
				}
			});

        
    }


	return (

		<Fragment>

			{/* {Modale} */}
            <Modal open={aperturaModale} onClose={chiudiModale} basic size='small' closeIcon>
                <Header icon='hand spock' content={titoloModale} />
                <Modal.Content>
                <p>
                    {messaggioModale}
                </p>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={chiudiModale} inverted>
                    <Icon name='checkmark' /> Ok
                </Button>
                </Modal.Actions>
            </Modal>


			<a id="iscrizione" style={{"position": "relative", "top":"-150px"}}></a>
			<div className="mv4" style={{backgroundImage:'url("https://ordinasicuro.it/670914_920408/lib/img/map-image.png")'}}>
				<div className="flex justify-center items-center flex-column">
					<h1 className="tc mb0 white">AGGIUNGI IL TUO NEGOZIO A ORDINA SICURO</h1>
					<h2 className="tc b f4 fw2 white mt0 lh-copy">Inviaci la tua richiesta di iscrizione per essere aggiunto a Ordina Sicuro</h2>
				</div>

				<form className="w-100" onSubmit={handleSubmit(onSubmit)} nome="formConfermaOrdine" id="formConfermaOrdine">
					<div className="flex flex-wrap justify-center items-start flex-row">

						<div className="w-40-l w-100 pa3-l">
							<div className="mt3">
								<input ref={register} className="pa2 input-reset ba bg-white w-100" type="text" name="nome_cognome_contatto" id="nome_cognome_contatto" placeholder="Il tuo nome*" required/>
							</div>
							<div className="mv3">
								<input ref={register} className="pa2 input-reset ba bg-white  w-100" type="email" name="email_contatto" id="email_contatto" placeholder="La tua e-mail*" required/>
							</div>
							<div className="mv3">
								<input ref={register} className="pa2 input-reset ba bg-white  w-100" type="tel" name="telefono_contatto" id="telefono_contatto" placeholder="Il tuo telefono*" required/>
							</div>
						</div>

						<div className="w-40-l w-100 pa3-l">
							<div className="mt3">
								<input ref={register} className="pa2 input-reset ba bg-white  w-100" type="text" name="sede_contatto" id="sede_contatto" placeholder="Sede della tua attività*" required/>
							</div>
							<div className="mv3">
								<input ref={register} className="pa2 input-reset ba bg-white  w-100" type="text" name="nome_attivita_contatto" id="nome_attivita_contatto" placeholder="Il nome della tua attività*" required/>
							</div>
						</div>

					</div>
					<div className="mh4">
						<label className="pa0 ma0 lh-copy pointer white f5"><input type="checkbox" required/> Ho letto <a href="https://www.iubenda.com/privacy-policy/92168795" style={{color:'#fed136'}}>l'informativa privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR.</label>
					</div>
					
					<div className="flex items-center justify-center mt3 mb4">
						<input className="w-80 b ph3 pv2 input-reset ba b--black grow pointer f4 dib" type="submit" value="ISCRIVITI ORA" style={{backgroundColor:'#fed136'}} />
					</div>
				</form>

			</div>


		</Fragment>

	);
}

export default IscrizioneOS;