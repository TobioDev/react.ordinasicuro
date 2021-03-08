import React, { Fragment, useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from "axios";

import Home from './Home'

import './App.css';
import 'animate.css/animate.css' 

import { Route, Redirect } from 'react-router-dom'
import NavbarOS from './NavbarOS';
import Negozio from './Negozio';
import ConfermaOrdine from './ConfermaOrdine';
import ConfermaComposti from './ConfermaComposti';
import OrdineInviato from './OrdineInviato'
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import Ricerca from './Ricerca';
import Login from './Login';
import Logout from './Logout';
import PannelloControllo from './PannelloControllo';
import ModificaArticolo from './ModificaArticolo';
import AggiungiArticolo from './AggiungiArticolo';
import DuplicaArticolo from './DuplicaArticolo';
import EliminaArticolo from './EliminaArticolo';
import GestioneComponenti from './GestioneComponenti';
import ModificaComponente from './ModificaComponente';
import EliminaComponente from './EliminaComponente';
import GestioneCategorie from './GestioneCategorie';
import ModificaCategoria from './ModificaCategoria';
import AggiungiCategoria from './AggiungiCategoria';
import EliminaCategoria from './EliminaCategoria';
import GestioneProfilo from './GestioneProfilo';
import ConfermaComposti2 from './ConfermaComposti2';
import GestioneArticoliCategoria from './GestioneArticoliCategoria';
import GestioneOrdini from './GestioneOrdini';
import InfoOrdine from './InfoOrdine';


function App() {



	const [loggato, setLoggato] = useState([false]);

	useEffect(() => {
		//check versione app
		axios.get('https://ordinasicuro.it/670914_920408/lib/api/versione/', {
			params: {
				
			}
		})
		.then(function (response) {
			console.log(response.data)
	
			if(localStorage.getItem("build_ordinasicuro") !== null && localStorage.getItem("build_ordinasicuro") !== response.data['get_versione'][0].build){
			  localStorage.setItem("build_ordinasicuro", response.data['get_versione'][0].build);
			  window.location.reload();
			}else
			if(localStorage.getItem("build_ordinasicuro") === null){
			  localStorage.setItem("build_ordinasicuro", response.data['get_versione'][0].build);
			}
			
		});
		
	}, [])
	

	useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
          
            setLoggato(false);
  
        }
        else{
            setLoggato(true);
        }
  
      } )


	return (

		<Fragment >
			<Helmet>
                <meta charSet="utf-8" />
                <title>Ordina Sicuro - Menu e Vetrina Digitale</title>
				<meta name="description" content="Ordina Sicuro è menu digitale con QR-Code e vetrina digitale per i tuoi prodotti. Scarica ora l'app per il tuo smartphone."></meta>
                <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>
			<NavbarOS loggato={loggato}/>
			<Route
				exact
				path="/"
				render={() => (
					<Home />
				)}
			/>

			<Route 
				path='/login'
				exact
				component={Login} />
			
			<Route 
				path='/logout'
				exact
				render={() => (
					<Logout setLoggato={setLoggato} />
				)}/>

			<Route 
				path='/pannello-controllo'
				exact
				render={() => (
					<PannelloControllo setLoggato={setLoggato} />
				)} />

			<Route 
				path='/gestione-articoli-categoria/:id_categoria_articolo'
				exact
				component={GestioneArticoliCategoria} />

			<Route 
				path='/gestione-componenti'
				exact
				component={GestioneComponenti} />

			<Route 
				path='/modifica-componente/:id_componente_articolo'
				exact
				component={ModificaComponente} />
			
			<Route 
				path='/elimina-componente/:id_componente_articolo'
				exact
				component={EliminaComponente} />

			<Route 
				path='/gestione-profilo'
				exact
				component={GestioneProfilo} />

			<Route 
				path='/gestione-ordini'
				exact
				component={GestioneOrdini} />

			<Route 
				path='/info-ordine/:id_ordine'
				exact
				component={InfoOrdine} />

			<Route 
				path='/gestione-categorie'
				exact
				component={GestioneCategorie} />

			<Route 
				path='/modifica-categoria/:id_categoria_articolo'
				exact
				component={ModificaCategoria} />

			<Route 
				path='/aggiungi-categoria/'
				exact
				component={AggiungiCategoria} />

			<Route 
				path='/elimina-categoria/:id_categoria_articolo'
				exact
				component={EliminaCategoria} />

			<Route 
				path='/modifica-articolo/:id_articolo'
				exact
				component={ModificaArticolo} />

			<Route 
				path='/duplica-articolo/:id_articolo'
				exact
				component={DuplicaArticolo} />

			<Route 
				path='/elimina-articolo/:id_articolo'
				exact
				component={EliminaArticolo} />

			<Route 
				path='/aggiungi-articolo/'
				exact
				component={AggiungiArticolo} />

			<Route 
				path='/ricerca/:termine_ricerca?'
				exact
				component={Ricerca} />
			
			{/* <Route 
				path='/ricerca/:termine_ricerca'
				exact
				component={Ricerca} /> */}


			<Route 
				path='/negozio/:id_negozio'
				exact
				component={Negozio} />
			
			<Route 
				path='/conferma-ordine/:id_ordine'
				exact
				component={ConfermaOrdine} />

			<Route 
				path='/conferma-composti/:id_ordine'
				exact
				component={ConfermaComposti} />

			<Route 
				path='/conferma-composti2/:id_ordine'
				exact
				component={ConfermaComposti2} />

			<Route 
				path='/ordine-inviato'
				exact
				component={OrdineInviato} />

			<Route 
				path='/privacy-policy'
				exact
				component={PrivacyPolicy} />
			
			<Route 
				path='/cookie-policy'
				exact
				component={CookiePolicy} />

			{/* Redirect siti web */}
			<Route exact path="/season">
				{<Redirect to="/negozio/13" />}
			</Route>

			<Route exact path="/negozio/8/farmerk-market-ristorante">
				{<Redirect to="/negozio/8" />}
			</Route>

			<Route exact path="/negozio/14/la-chiccheria">
				{<Redirect to="/negozio/14" />}
			</Route>

			<Route exact path="/negozio/9/cooperativa-il-talento">
				{<Redirect to="/negozio/9" />}
			</Route>

			<Route exact path="/negozio/9/cooperativa-il-talento">
				{<Redirect to="/negozio/9" />}
			</Route>

			<Route exact path="/negozio/2/farmer-market">
				{<Redirect to="/negozio/2" />}
			</Route>

		</Fragment>


	);



}

export default App;
