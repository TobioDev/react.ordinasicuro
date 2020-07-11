import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'



const Header = () => {


	return (

		<header className="sans-serif">
			<div className="cover bg-left bg-center-l">
				<div className="bg-black-80 pb5 pb6-m pb7-l">
					<div className="tc-l ph3">
						<h2 className="fw1 f3 white-80 mt3 mb0">Fase 2. Ripartiamo in sicurezza.</h2>
						<h1 className="f1 f1-l fw2 white-90 lh-title mt1">ORDINA SICURO</h1>
						<div className="tc mb3">
							<p className="f4 fw6 mb2 f6 mt0 white">Effettua una ricerca fra le attività presenti</p>
							<input
								placeholder="Nome, luogo, CAP..."
								className="mw-100 w-100 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box"
							/>
							<input
								type="submit"
								value="CERCA"
								className="input-reset grow w-100 w-auto-ns mt2 bg-black-80 white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray"
							/>
						</div>
					</div>
				</div>
			</div>
		</header>

	);

}

export default Header;