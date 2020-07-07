import React, {Fragment} from 'react';
import Card from './Card';

const CardList = ({negozi}) => {

	const cardsArray = negozi.map((negozio,i) =>{

			return (
				<Card 
					key={i} 
					nome={negozio.nome} 
					id_categoria={negozio.id_categoria} 
					url_logo={negozio.url_logo} 
					citta={negozio.citta} 
				/>
			);
	})


	return (

		<Fragment>

			<div>
				{cardsArray}
			</div>

		</Fragment>


	);
}

export default CardList;