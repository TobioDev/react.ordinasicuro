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

			{cardsArray}

		</Fragment>


	);
}

export default CardList;