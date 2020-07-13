import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'



const Header = () => {


	return (

		<header className="sans-serif">
			<div className="cover bg-left bg-center-l">
				<div className="bg-black-80 pt7 pb6">
					<div className="tc ph3">
						<h2 className="fw1 f-4 white-80 mt3 mb0 sottotitolo"><i>Fase 2. Ripartiamo in sicurezza.</i></h2>
						<h1 className="f-6-l f-5 fw7 white-90 lh-title mt1 titolo">ORDINA SICURO</h1>
						<div className="tc mb3">
							<p className="f3 fw6 mb2 mt0 white titolo">Effettua una ricerca fra le attività presenti</p>
							<input
								placeholder="Nome, luogo, CAP..."
								className="mw-100 w-90 w-70-ns f4 input-reset ba b--black-20 pv3 ph4 border-box titolo"
							/>
							<input
								type="submit"
								value="CERCA"
								className="input-reset grow w-90 w-auto-ns mt2 bg-black-80 white f4 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray titolo"
							/>
						</div>
					</div>
				</div>
			</div>
		</header>

	);

}

export default Header;