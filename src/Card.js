import React from 'react';
import {Link} from 'react-router-dom'

import './Card.css';

const Card = ({nome, categoria, url_logo, citta, id_negozio}) =>{

	return(

		<div className="tc bg-washed-blue dib pa3 ma2 grow bw2 card">
			<Link to={"/negozio/"+id_negozio}>
				<img src={`https://ordinasicuro.it/img_negozi/${url_logo}`} className="db" alt="" />
				<div className="pa2 bt b--black-20">
				<p className="f6 db link dark-blue hover-blue">{nome}</p>
				<p className="f6 gray mv1">{citta}</p>
				<p className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1">{categoria}</p>
				</div>
			</Link>
		  </div>
	);
};

export default Card;