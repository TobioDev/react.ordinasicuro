import React, { Fragment, useState, useEffect } from 'react';

import Home from './Home'
import Footer from './Footer';

import './App.css';

import { Route, Link } from 'react-router-dom'


function App() {


	return (

		<Fragment >
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
