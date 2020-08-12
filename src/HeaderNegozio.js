import React, { useState, useEffect, Fragment } from 'react'

import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import './HeaderNegozio.css'

const HeaderNegozio = ({infoNegozio, categorie,infoUtenteNegozio}) => {

	const [ aperturaModale, setAperturaModale ] = useState(false);
    const [ titoloModale, setTitoloModale] = useState('');
	const [ messaggioModale, setMessaggioModale] = useState('');
	
	const avviaModale = (titolo, testo) => {
					setAperturaModale(true);
					setTitoloModale(titolo);
					setMessaggioModale(testo);
	}


	const chiudiModale = () => setAperturaModale(false);

	const avviaModaleZone = () => {
		avviaModale('Zone di Consegna', infoNegozio.zone_consegna)
	}

	const avviaModaleOrari = () => {
		avviaModale('Orari di Consegna', infoNegozio.orari_consegna)
	}

	// const [nome, setNome] = useState('')

	// useEffect(() => {
	// 	setNome(infoNegozio.nome)
	// 	setNome(nome.replace('\\', ''))
	// })

    const categoriaNegozio = categorie
                                .filter(categoria => categoria.id === infoNegozio.id_categoria)
								.map(categorieFiltrate => categorieFiltrate.nome.replace('\\', ''));
								
	let urlBackground = "";

	if(infoNegozio.url_background !== ''){
		urlBackground = "https://ordinasicuro.it/img_negozi/background/"+infoNegozio.url_background;
	}
	else { urlBackground = "https://ordinasicuro.it/img/header-bg.jpg" }

	let visibilitaBottoni = 'flex';

	if(infoUtenteNegozio.livello === '0' || infoUtenteNegozio.livello === '2'){

		visibilitaBottoni = 'none';

	}

	

    return (
		<Fragment>

			{/* {Modale} */}
            <Modal open={aperturaModale} onClose={chiudiModale} basic size='small' closeIcon>
                <Header icon='info circle' content={titoloModale} />
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

			<header className="sans-serif" id="home">
				<div className="bg-left bg-center-l" style={{ backgroundImage : "url("+urlBackground+")", backgroundSize : "cover" }}>
					<div className="pt6-l pt5 pb5-l pb3">
						<div className="tc ph3 mt5-l mt6-l mt5">
							<a className="f7 link dim br3 ph3 pv2 mb0 dib black sfondo-primario titolo fw7" href="#0">{categoriaNegozio}</a>
							<h3 className="fw1 f-4 white-80 mb0 mt3 sottotitolo"><i>{infoNegozio.citta}</i></h3>
							<h1 className="f-6-l f2 fw7 white-90 lh-title mt1 titolo">{infoNegozio.nome}</h1>
							<p className="f4-l f5 white sottotitolo">{infoNegozio.descrizione}</p>
							<div className="w-100 flex flex-row justify-center items-center" style={{display: visibilitaBottoni}}>
								<div className="w-20-l w40 ph2">
									<div onClick={() => avviaModaleZone()} className="link br2 ph3 pv2 mb2 mt2 mh3-l dib black w-100 tc b f4-l hover-white titolo pointer" style={{backgroundColor : "rgb(255, 193, 7)"}}>Zone di Consegna</div>
								</div>
								<div className="w-20-l w-40 ph2">
									<div onClick={() => avviaModaleOrari()} className="link br2 ph3 pv2 mb2 mt2 mh3-l dib black w-100 tc b f4-l hover-white titolo pointer" style={{backgroundColor : "rgb(255, 193, 7)"}}>Orari</div>
								</div>

							</div>
							<div>
								<img src="https://ordinasicuro.it/img/arrow_bouncing.gif" className="w4-l w3" alt=""/>
							</div>
						</div>
					</div>
				</div>
			</header>

		</Fragment>
        
    )
}

export default HeaderNegozio
