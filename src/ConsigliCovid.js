import React, {Fragment} from 'react';

const ConsigliCovid = () => {

	return (
		<Fragment>
			<a id="fase-3" style={{"position": "relative", "top":"-150px"}}></a>
			<div className="flex justify-center items-center flex-column">
				<h2 className="tc mb0">#FASE3: RIPARTIAMO</h2>
				<h3 className="tc f4 fw2 gray mt0 lh-copy">Agire insieme come comunità</h3>
			</div>

			<div className="flex flex-wrap justify-center items-center">
				<img className="pa2 w-40-l w-100" src="https://ordinasicuro.it/img/covid/lavare_mani.png" alt=""/>
			</div>
		</Fragment>

	);
}

export default ConsigliCovid;