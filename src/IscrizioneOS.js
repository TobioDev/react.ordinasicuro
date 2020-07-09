import React, {Fragment} from 'react';


const IscrizioneOS = () =>{
	return(
		
		<Fragment>
			<div className="flex justify-center items-center flex-column">
				<h1 className="tc mb0">AGGIUNGI IL TUO NEGOZIO A ORDINA SICURO</h1>
				<h2 className="tc f4 fw2 gray mt0 lh-copy">Inviaci la tua richiesta di iscrizione per essere aggiunto a Ordina Sicuro</h2>
			</div>
			
			<form className="w-100">
				<div className="flex flex-wrap justify-center items-start flex-row">

					<div className="w-40-l w-100 pa3-l">
						  <div className="mt3">
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="nome_cognome_contatto"  id="nome_cognome_contatto" placeholder="Il tuo nome*"/>
						  </div>
						  <div className="mv3">
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email_contatto"  id="email_contatto" placeholder="La tua e-mail*"/>
						  </div>
						  <div className="mv3">
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="tel" name="telefono_contatto"  id="telefono_contatto" placeholder="Il tuo telefono*"/>
						  </div>
					</div>

					<div className="w-40-l w-100 pa3-l">
						  <div className="mt3">
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="sede_contatto"  id="sede_contatto" placeholder="Sede della tua attività*"/>
						  </div>
						  <div className="mv3">
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="nome_attivita_contatto"  id="nome_attivita_contatto" placeholder="Il nome della tua attività*"/>
						  </div>
					</div>
					
				</div>
			<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			</form>

			 
			  	
			  	<div className="w-40">
			  		<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			  		  <legend className="f4 fw6 ph0 mh0">Sign In</legend>
			  		  <div className="mt3">
			  		    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			  		    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			  		  </div>
			  		  <div className="mv3">
			  		    <label className="db fw6 lh-copy f6" for="password">Password</label>
			  		    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			  		  </div>
			  		  <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			  		</fieldset>
			  	</div>

			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
			    </div>
			    <div className="lh-copy mt3">
			      <a href="#0" className="f6 link dim black db">Sign up</a>
			      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
			    </div>

		</Fragment>

	);
}

export default IscrizioneOS;