import React, { Fragment } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaMobileAlt } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa';

const FeaturesIcone = () =>{

	return (

		<Fragment>
			<div className="mt5">
				<h1 className="tc titolo">ORDINA SICURO È SEMPLICE ED IMMEDIATO</h1>
				<div className="flex flex-wrap justify-center items-start">
					<div className="flex items-center justify-center flex-column tc dib pa3 ma2 mw5 bw2">
						<div className="flex items-center justify-center bg-yellow br-100 w4 h4">
							<FaSearch  className="white f1"/>
						</div>
						<h2 className="mb0 titolo">Scegli</h2>
						<p className="sottotitolo gray">Cerca e sfoglia online il menu del tuo ristorante preferito o scorri la vetrina di un negozio</p>
					</div>
					<div className="flex items-center justify-center flex-column tc dib pa3 ma2 mw5 bw2">
						<div className="flex items-center justify-center bg-yellow br-100 w4 h4">
							<FaMobileAlt  className="white f1"/>
						</div>
						<h2 className="mb0 titolo">Ordina</h2>
						<p className="sottotitolo gray">Ordina al cameriere o direttamente in negozio. Se è disponibile puoi anche scegliere la consegna a domicilio o l'asporto</p>
					</div>
					<div className="flex items-center justify-center flex-column tc dib pa3 ma2 mw5 bw2">
						<div className="flex items-center justify-center bg-yellow br-100 w4 h4">
							<FaHandHoldingHeart  className="white f1"/>
						</div>
						<h2 className="mb0 titolo">Mangia o Ricevi</h2>
						<p className="sottotitolo gray">Riceverai quanto ordinato, servitio al tuo tavolo o consegnato dai negozianti direttamente a casa tua!</p>
					</div>
				</div>
			</div>

		</Fragment>



	)

};


export default FeaturesIcone;