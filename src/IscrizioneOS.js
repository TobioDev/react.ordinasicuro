import React, { Fragment } from 'react';


const IscrizioneOS = () => {
	return (

		<Fragment>
			<a id="iscrizione" style={{"position": "relative", "top":"-150px"}}></a>
			<div className="mv4" style={{backgroundImage:'url("https://ordinasicuro.it/img/map-image.png")'}}>
				<div className="flex justify-center items-center flex-column">
					<h1 className="tc mb0 white">AGGIUNGI IL TUO NEGOZIO A ORDINA SICURO</h1>
					<h2 className="tc b f4 fw2 white mt0 lh-copy">Inviaci la tua richiesta di iscrizione per essere aggiunto a Ordina Sicuro</h2>
				</div>

				<form className="w-100">
					<div className="flex flex-wrap justify-center items-start flex-row">

						<div className="w-40-l w-100 pa3-l">
							<div className="mt3">
								<input className="pa2 input-reset ba bg-white w-100" type="text" name="nome_cognome_contatto" id="nome_cognome_contatto" placeholder="Il tuo nome*" />
							</div>
							<div className="mv3">
								<input className="pa2 input-reset ba bg-white  w-100" type="email" name="email_contatto" id="email_contatto" placeholder="La tua e-mail*" />
							</div>
							<div className="mv3">
								<input className="pa2 input-reset ba bg-white  w-100" type="tel" name="telefono_contatto" id="telefono_contatto" placeholder="Il tuo telefono*" />
							</div>
						</div>

						<div className="w-40-l w-100 pa3-l">
							<div className="mt3">
								<input className="pa2 input-reset ba bg-white  w-100" type="text" name="sede_contatto" id="sede_contatto" placeholder="Sede della tua attività*" />
							</div>
							<div className="mv3">
								<input className="pa2 input-reset ba bg-white  w-100" type="text" name="nome_attivita_contatto" id="nome_attivita_contatto" placeholder="Il nome della tua attività*" />
							</div>
						</div>

					</div>
					<div className="mh4">
						<label className="pa0 ma0 lh-copy pointer white f5"><input type="checkbox" /> Ho letto <a href="https://www.iubenda.com/privacy-policy/92168795" style={{color:'#fed136'}}>l'informativa privacy</a> e acconsento al trattamento dei miei dati secondo la normativa europea per la protezione dei dati personali n. 679/2016, GDPR.</label>
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