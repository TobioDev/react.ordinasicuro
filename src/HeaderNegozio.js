import React, { useState, useEffect } from 'react'

import './HeaderNegozio.css'

const HeaderNegozio = ({infoNegozio, categorie}) => {

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

	

    return (
        <header className="sans-serif" id="home">
			<div className="bg-left bg-center-l" style={{ backgroundImage : "url("+urlBackground+")", backgroundSize : "cover" }}>
				<div className="pt6-l pt5 pb5-l pb3">
					<div className="tc ph3 mt5-l mt6-l mt5">
                        <a className="f7 link dim br3 ph3 pv2 mb0 dib black sfondo-primario titolo fw7" href="#0">{categoriaNegozio}</a>
						<h3 className="fw1 f-4 white-80 mb0 mt3 sottotitolo"><i>{infoNegozio.citta}</i></h3>
						<h1 className="f-6-l f2 fw7 white-90 lh-title mt1 titolo">{infoNegozio.nome}</h1>
                        <p className="f4-l f5 white sottotitolo">{infoNegozio.descrizione}</p>
						<div>
							<img src="https://ordinasicuro.it/img/arrow_bouncing.gif" className="w4-l w3" alt=""/>
						</div>
					</div>
				</div>
			</div>
		</header>
    )
}

export default HeaderNegozio
