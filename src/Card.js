import React from 'react';

import './Card.css';

const Card = ({nome, id_categoria, url_logo, citta}) =>{

	return(

		  <div className="tc bg-washed-blue dib pa3 ma2 grow bw2 shadow-5 card">
		    <img src={`https://ordinasicuro.it/img_negozi/${url_logo}`} className="db" alt="" />
		    <div className="pa2 bt b--black-20">
		      <a className="f6 db link dark-blue hover-blue" href="#">{nome}</a>
		      <p className="f6 gray mv1">{citta}</p>
		      <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">{id_categoria}</a>
		    </div>
		    <a clasName="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
		  </div>
	);
};

export default Card;