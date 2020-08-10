import React from 'react';
import './Header.css';

import { HashLink as Link } from 'react-router-hash-link';



const Header = () => {


	return (

		<header className="sans-serif" id="home">
			<div className="cover bg-left bg-center-l">
				<div className="pt6-l pt5 pb5-l pb4">
					<div className="tc ph3 mt5-l mt5">
						<h2 className="fw1 f4 f3-l white-80 mb0 sottotitolo pt4 pt0-l"><i>Fase 3. Ripartiamo insieme.</i></h2>
						<h1 className="f1-l f2 fw7 white-90 lh-title mt1 titolo">ORDINA SICURO</h1>
						<div className="tc mb3">
							<p className="f5 f3-l fw6 mb2 mt0 white titolo">Effettua una ricerca fra le attività presenti</p>
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
						<div>
							<Link to="#attivita"><img src="https://ordinasicuro.it/img/arrow_bouncing.gif" className="w4-l w3" alt=""/></Link>
						</div>
					</div>
				</div>
			</div>
		</header>

	);

}

export default Header;