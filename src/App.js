import React, { Fragment } from 'react';
import {Helmet} from "react-helmet";

import Home from './Home'
import Footer from './Footer';

import './App.css';

import { Route } from 'react-router-dom'


function App() {


	return (

		<Fragment >
			<Helmet>
                <meta charSet="utf-8" />
                <title>Ordina Sicuro - Menu e Vetrina Digitale</title>
                <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"/>
            </Helmet>
			<Route
				exact
				path="/"
				render={() => (
					<Home />
				)}
			/>

			<Footer />

		</Fragment>


	);



}

export default App;
