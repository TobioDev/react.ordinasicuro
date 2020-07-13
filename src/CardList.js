import React, {Fragment} from 'react';
import Card from './Card';

const CardList = ({negozi, categorie}) => {

	const cardsArray = negozi.map((negozio,i) =>

		<Card 
			key={i} 
			nome={negozio.nome} 
			categoria={
				categorie
				.filter(categoria => categoria.id === negozio.id_categoria)
				.map(categorieFiltrate => categorieFiltrate.nome)
			}
			url_logo={negozio.url_logo} 
			citta={negozio.citta}
		/>
			
	);


	return (

		<Fragment>
			
			<div className="flex justify-center items-center flex-column mt4">
				<h2 className="tc mb0 titolo">SCEGLI LA TUA ATTIVITÀ PREFERITA</h2>
				<h3 className="tc f4 fw2 gray mt0 lh-copy sottotitolo i">Sfoglia il menu, scorri la vetrina o ordina per asporto e consegna a domicilio:</h3>
			</div>

			<div className="flex flex-wrap justify-center items-center mt4 mb4">
				{cardsArray}
			</div>

			

		</Fragment>


	);
}

export default CardList;