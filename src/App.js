import React, { Fragment, useState, useEffect } from 'react';

import { Menu, Segment } from 'semantic-ui-react';

import Home from './Home'
import Footer from './Footer';

import './App.css';

import { Route, Link } from 'react-router-dom'


function App() {


	return (

		<Fragment >
			<Segment inverted className="w-100" style={{marginBottom:"0px", position:"fixed", top:0, zIndex:800}} >
				<Menu inverted secondary size="massive">
					<Menu.Item >
						<img style={{width:"150px"}} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo"/>
					</Menu.Item>
					<Menu.Menu position="right">
						<Menu.Item name='home' active={true} />
						<Menu.Item name='messages' />
						<Menu.Item name='friends' />
					</Menu.Menu>
					
				</Menu>
			</Segment>
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
