import React, { Fragment } from 'react';
import {Helmet} from "react-helmet";

import Home from './Home'

import './App.css';
import 'animate.css/animate.css' 

import { Route } from 'react-router-dom'
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


function App() {


	return (

		<Fragment >
			<Helmet>
                <meta charSet="utf-8" />
                <title>Ordina Sicuro - Menu e Vetrina Digitale</title>
                <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>
			<NavbarOS />
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
				component={Logout} />

			<Route 
				path='/pannello-controllo'
				exact
				component={PannelloControllo} />

			<Route 
				path='/modifica-articolo/:id_articolo'
				exact
				component={ModificaArticolo} />

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

		</Fragment>


	);



}

export default App;
