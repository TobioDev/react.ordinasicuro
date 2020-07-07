import React from 'react';

import './Card.css';

const Card = ({nome, categoria, url_logo, citta}) =>{

	return(

		  <div className="tc bg-washed-blue dib pa3 ma2 grow bw2 card">
		    <img src={`https://ordinasicuro.it/img_negozi/${url_logo}`} className="db" alt="" />
		    <div className="pa2 bt b--black-20">
		      <a className="f6 db link dark-blue hover-blue" href="#">{nome}</a>
		      <p className="f6 gray mv1">{citta}</p>
		      <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">{categoria}</a>
		    </div>
		  </div>
	);
};

export default Card;