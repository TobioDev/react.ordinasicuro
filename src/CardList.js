import React, {Fragment, useState} from 'react';
import Card from './Card';

const CardList = ({negozi, categorie}) => {

	const cardsArray = negozi.map((negozio,i) =>{

		//setCat( categorie.filter(categoria => {return categoria.id === negozio.id_categoria}) );
		//console.log(cat2[0].nome);

			return (
				<Card 
					key={i} 
					nome={negozio.nome} 
					categoria={
						categorie
						.filter(categoria => categoria.id === negozio.id_categoria)
						.map(categorieFiltrate => (categorieFiltrate.nome))
					}
					url_logo={negozio.url_logo} 
					citta={negozio.citta}
				/>
			);
	});


	return (

		<Fragment>

			{cardsArray}

		</Fragment>


	);
}

export default CardList;