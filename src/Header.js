import React from 'react';


const Header = () => {


	return(

		<header className="sans-serif">
		  <div className="cover bg-left bg-center-l">
		    <div className="bg-black-80 pb5 pb6-m pb7-l">
		      <nav className="dt w-100 mw8 center"> 
		        <div className="dtc w2 v-mid pa3">
		          <a href="/" className="dib w2 h2 pa1 ba b--white-90 grow-large border-box">
		            <svg className="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg>
		          </a>
		        </div>
		        <div className="dtc v-mid tr pa3">
		          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >How it Works</a> 
		          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Pricing</a> 
		          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >About</a> 
		          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Careers</a> 
		          <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
		        </div>
		      </nav> 
		      <div className="tc-l mt4 mt5-m mt6-l ph3">
		        <h2 className="fw1 f3 white-80 mt3 mb0">Fase 2. Ripartiamo in sicurezza.</h2>
		        <h1 className="f1 f1-l fw2 white-90 lh-title mt1">ORDINA SICURO</h1>
		        <div className="tc mb3">
		            <p className="f4 fw6 mb2 f6 mt0 white">Effettua una ricerca fra le attività presenti</p>
		            <input
		            	placeholder="Nome, luogo, CAP..."
		            	className="mw-100 w-100 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box"
		            />
		            <input
		            	type="submit"
		            	value="CERCA"
		            	className="input-reset w-100 w-auto-ns mt2 bg-black-80 white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray"
		            />
		        </div>
		      </div>
		    </div>
		  </div> 
		</header>

	);

}

export default Header;