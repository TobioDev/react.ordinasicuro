import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import { Route } from 'react-router-dom'

import Home from './Home'
import Footer from './Footer';

function App() {

	const [negoziHome, setNegoziHome] = useState([]);
	const [categorie, setCategorie] = useState([]);

	//Passare array vuoto alla fine se si vuole simulare il comportamento di componentDidMount 
	useEffect(() => {
		fetch('https://ordinasicuro.it/index.php/api/negozi_home')
			.then(response => response.json())
			.then(json => setNegoziHome(json));
		fetch('https://ordinasicuro.it/index.php/api/categorie')
			.then(response => response.json())
			.then(json => setCategorie(json));
	}, []);


	const negoziFiltrati = negoziHome.filter(negozio => {
		return negozio.visibile !== '0';
	});


	if (negoziHome.lenght === 0) {
	}
	else {
		return (

			<Fragment >
				<Route
					exact
					path="/"
					render={()=> (
						<Home negozi = {negoziFiltrati} categorie={categorie} />
					)}
				/>

				<Route
					exact
					path="/footer"
					render={()=> (
						<Footer />
					)}
				/>
				
				<Footer />

			</Fragment>


		);

	}



}

export default App;
