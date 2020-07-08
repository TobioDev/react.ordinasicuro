import React, { Fragment, useState, useEffect }  from 'react';
import './App.css';
import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';
import TimelineVerticale from './TimelineVerticale';
import FeaturesIcone from './FeaturesIcone';

function App() {

	const [negoziHome, setNegoziHome] = useState([]);
	const [categorie, setCategorie] = useState([]);

	//Passare array vuoto alla fine se si vuole simulare il comportamento di componentDidMount 
	useEffect(()=>{

		fetch('https://ordinasicuro.it/index.php/api/negozi_home')
		  .then(response => response.json())
		  .then(json => setNegoziHome(json));

		  fetch('https://ordinasicuro.it/index.php/api/categorie')
		    .then(response => response.json())
		    .then(json => setCategorie(json));

	}, []);


	const negoziFiltrati = negoziHome.filter( negozio => {
			return negozio.visibile !== '0'; 
		});


	if (negoziHome.lenght === 0){
	}
	else{

		return (

			<Fragment >

		  	<Header />
		  	<SezioneBoxed backgroundColor="bg-near-white">

		  		<CardList negozi={negoziFiltrati} categorie={categorie}/>
		  		
		  	</SezioneBoxed>

		  	<SezioneBoxed backgroundColor="bg-white">

		  		<FeaturesIcone />		  		
		  		
		  	</SezioneBoxed>   

		  	<SezioneBoxed
		  		backgroundColor="bg-near-white"	align="items-start" direction="flex-column"		  	>

		  		<TimelineVerticale/>
		  		
		  	</SezioneBoxed>      

		  </Fragment>

		  
		);

	}


  
}

export default App;
