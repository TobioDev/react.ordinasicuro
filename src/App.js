import React, { Fragment, useState, useEffect }  from 'react';
import './App.css';
import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';

function App() {

	const [negoziHome, setNegoziHome] = useState([]);

	//Passare array vuoto alla fine se si vuole simulare il comportamento di componentDidMount 
	useEffect(()=>{

		fetch('https://ordinasicuro.it/index.php/api/negozi_home')
		  .then(response => response.json())
		  .then(json => setNegoziHome(json));
	}, []);


	const negoziFiltrati = negoziHome.filter( negozio => {
			return negozio.visibile !== '0'; 
		});



	// const cardsArray = negoziHome.map((negozio,i) =>{
	// 	return (
	// 		<p>{negozio.nome}</p>
	// 	);
	// })
	if (negoziHome.lenght === 0){
		console.log('ancora zero');
	}
	else{

		return (

			<Fragment >

		  	<Header />
		  	<SezioneBoxed>

		  		<CardList negozi={negoziFiltrati}/>
		  		
		  	</SezioneBoxed>    

		  </Fragment>

		  
		);

	}


  
}

export default App;
